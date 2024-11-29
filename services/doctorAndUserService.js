const mongoose = require('mongoose');
const { Doctor } = require('../models/doctorModel');

const getDoctorDetails = async (doctorId) => {
    try {
        const doctors = await Doctor.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(`${doctorId}`) } // Match the doctor by ID
            },
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
                    },
                    email: {
                        $ifNull: ['$userDetails.email', 'Unknown']  // Set default name
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
                $lookup: {
                    from: 'timeslots',           // Join with 'timeslots' collection
                    localField: 'timeslotId',    // Field in Doctor collection (timeslotId)
                    foreignField: '_id',         // Field in Timeslots collection
                    as: 'timeslotDetails'        // Alias for timeslot data
                }
            },
            {
                $unwind: {
                    path: '$timeslotDetails',
                    preserveNullAndEmptyArrays: true // Keeps doctors without timeslot details
                }
            },
            {
                $set: {
                    timeslotAvailability: {
                        $ifNull: ['$timeslotDetails.availability', []]  // Default to empty array if no availability
                    }
                }
            },
            {
                $project: {
                    userDetails: 0,
                    userId: 0,
                    __v: 0,
                    departmentId: 0,
                    departmentDetails: 0,
                    timeslotId: 0,
                    timeslotDetails: 0
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