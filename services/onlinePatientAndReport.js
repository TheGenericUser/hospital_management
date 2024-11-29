const mongoose = require('mongoose');
const { OnlinePatient } = require('../models/onlinePatientModel');

const getOnlinePatientDetailsWithReportCount = async (id) => {
    try {
        const onlinePatients = await OnlinePatient.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(`${id}`) } // Match the doctor by ID
            },
            {
                $lookup: {
                    from: 'reports',               // The collection to join with
                    localField: 'labReportId',     // Local field in WalkinPatient
                    foreignField: '_id',           // Foreign field in Report
                    as: 'reportDetails'            // Alias for the resulting matched report data
                }
            },
            {
                $unwind: {
                    path: '$reportDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                // Step 3: Add a new field `reportCount` which contains the length of the `reports` array
                $set: {
                    reportCount: {
                        $size: {
                            $ifNull: [
                                { $ifNull: ["$reportDetails.reports", []] },  // If 'reports' is null, treat it as an empty array
                                []  // If 'reportDetails.reports' is missing or null, use an empty array
                            ]
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',                  // The collection to join with
                    localField: 'userId',           // Local field in OnlinePatient
                    foreignField: '_id',            // Foreign field in User
                    as: 'userDetails'               // Alias for the resulting matched user data
                }
            },
            // Step 5: Unwind the userDetails array (to make it a single user object per OnlinePatient)
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true  // Keep OnlinePatients without user details
                }
            },
            {
                // Add user fields directly after unwinding userDetails
                $addFields: {
                    name: '$userDetails.name',  // Correctly reference the 'name' field
                    email: '$userDetails.email',
                    age: '$userDetails.age',
                    gender: '$userDetails.gender'
                }
            },
            {
                // Step 6: Project the final result (select fields you want to return)
                $project: {
                    labReportId: 1,              // Include labReportId from WalkinPatient
                    name: 1,            // Now you can directly use 'name' since it's added as a field
                    email: 1,
                    age: 1,
                    gender: 1,
                    createdAt: 1,
                    reportCount: 1,            // Include the length of the reports array
                }
            }
        ]);

        return onlinePatients;
    } catch (error) {
        console.error('Failed to fetch online patient details: ' + error.message);
        throw new Error('Server Error');
    }
};

module.exports = { getOnlinePatientDetailsWithReportCount };