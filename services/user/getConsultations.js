const { Consultation } = require('../../models/consultationModel');

const getConsultations = async (onlinePatientId) => {
    try {
        // Aggregation pipeline to fetch the necessary data with lookups
        const layout = await Consultation.aggregate([
            {
                $match: { onlinePatientId: onlinePatientId}
            },
            {

                $lookup: {
                    from: 'doctors', // Collection name for the Doctor model
                    localField: 'doctorId', // Field in Consultation collection
                    foreignField: '_id', // Field in Doctor collection
                    as: 'doctorDetails' // Alias to store result
                }
            },
            {
                // Unwind the doctorDetails array (it will contain one element since doctorId is unique)
                $unwind: '$doctorDetails'
            },
            {
                // Lookup to join with User collection (to get doctor name using userId)
                $lookup: {
                    from: 'users', // Collection name for the User model
                    localField: 'doctorDetails.userId', // Field in doctorDetails that references User
                    foreignField: '_id', // Field in User collection
                    as: 'userDetails' // Alias to store result
                }
            },
            {
                // Unwind the userDetails array
                $unwind: '$userDetails'
            },
            {
                // Lookup to join with Department collection (to get department details)
                $lookup: {
                    from: 'departments', // Collection name for the Department model
                    localField: 'doctorDetails.departmentId', // Field in doctorDetails that references Department
                    foreignField: '_id', // Field in Department collection
                    as: 'departmentDetails' // Alias to store result
                }
            },
            {
                // Unwind the departmentDetails array
                $unwind: '$departmentDetails'
            },
            {
                $sort: { createdAt: -1 } // Sort by createdAt in descending order
            },
            {
                // Project the final layout with relevant information
                $project: {
                    consultationId: '$_id',
                    doctorName: '$userDetails.name',
                    departmentName: '$departmentDetails.name',
                    consultationTime: 1, // Include the consultationTime field from Consultation
                    status: 1, // Include the status field from Consultation
                    consultationDetails: 1, // Include all consultation fields
                }
            }
        ]);

        return layout;
    } catch (error) {
        console.error('Error fetching consultation layout:', error);
        throw error;
    }
}

module.exports = { getConsultations }
