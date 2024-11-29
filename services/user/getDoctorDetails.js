const { Doctor } = require('../../models/doctorModel');

const getDoctorDetails = async (sortBy) => {
    try {
        const doctors = await Doctor.aggregate([
            {
                $lookup: {
                    from: 'users',          // Join with 'users' collection
                    localField: 'userId',   // field in Doctor collection
                    foreignField: '_id',    // field in User collection
                    as: 'userDetails'       // alias for user data
                }
            },
            {
                $unwind: { 
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true // Keeps doctors without users
                }
            },
            {
                $set: {
                    name: {
                        $ifNull: ['$userDetails.name', 'Unknown']  // Set default name
                    }
                }
            },

            {
                $lookup: {
                    from: 'departments',        // Join with 'departments' collection
                    localField: 'departmentId', // Field in Doctor collection (departmentId)
                    foreignField: '_id',        // Field in Departments collection
                    as: 'departmentDetails'     // Alias for department data
                }
            },
            {
                $unwind: {
                    path: '$departmentDetails',
                    preserveNullAndEmptyArrays: true // Keeps doctors without departments
                }
            },
            {
                $set: {
                    departmentName: {
                        $ifNull: ['$departmentDetails.name', 'N.A']  // Set default department name if null
                    }
                }
            },

            {
                $sort: { [sortBy]: 1 }
            },
            {
                $project: {
                    userDetails: 0  // Optionally remove userDetails field
                }
            }
            
        ]);

        return doctors;
    } catch (error) {
        console.log('Failed to fetch doctor details: ' + error.message);
        throw new Error('Server Error');
    }
};

module.exports = { getDoctorDetails };