const mongoose = require('mongoose');
const { WalkinPatient } = require('../models/walkinPatientModel');

const getWalkinPatientDetailsWithReportCount = async (id) => {
    try {
        const walkinPatients = await WalkinPatient.aggregate([
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
                // Step 2: Unwind the reportDetails array (so each WalkinPatient gets its own report)
                $unwind: {
                    path: '$reportDetails',
                    preserveNullAndEmptyArrays: true  // Keep WalkinPatients without reports
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
                $project: {
                    __v: 0,
                    reportDetails: 0,
                    updatedAt: 0,
                    createdAt:0,
                }
            }
        ]);

        return walkinPatients;
    } catch (error) {
        console.error('Failed to fetch walkin patient details: ' + error.message);
        throw new Error('Server Error');
    }
};

module.exports = { getWalkinPatientDetailsWithReportCount };
