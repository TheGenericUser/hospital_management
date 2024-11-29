const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const { OnlinePatient } = require('../../../models/onlinePatientModel');

const searchOnlinePatients = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    const { id: patientId, name, email, gender, ageBelow, ageAbove, createdBefore, createdAfter, page } = req.query;

    const limit = parseInt(process.env.ONLINE_PATIENTS_PAGINATION_LIMIT, 10) || 10;  // Default to 10 if not set
    const skip = (parseInt(page, 10) - 1) * limit;

    let userQuery = {};
    let patientQuery = {};

    if (patientId) patientQuery._id = new mongoose.Types.ObjectId(`${patientId}`);

    if (name) userQuery['userData.name'] = { $regex: name, $options: 'i' };  // Case-insensitive search for name
    if (email) userQuery['userData.email'] = { $regex: email, $options: 'i' };  // Case-insensitive search for email
    if (gender && gender !== 'na') userQuery['userData.gender'] = gender;
    if (ageBelow) userQuery['userData.age'] = { ...userQuery['userData.age'], $lte: ageBelow };
    if (ageAbove) userQuery['userData.age'] = { ...userQuery['userData.age'], $gte: ageAbove };
    userQuery['userData.role'] = 'user';

    if (createdBefore) patientQuery.createdAt = { ...doctorQuery.createdAt, $lte: new Date(createdBefore) };

    if (createdAfter) patientQuery.createdAt = { ...doctorQuery.createdAt, $gte: new Date(createdAfter) };

    let pipeline = [
        {
            $match: patientQuery,  // Match doctors based on the initial doctor query
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData',
            },
        },
        {
            $unwind: { path: '$userData', preserveNullAndEmptyArrays: true },
        },
    ];
    if (Object.keys(userQuery).length > 0) {
        pipeline.push({
            $match: userQuery
        });
    }

    pipeline.push(
        {
            $set: {
                name: {
                    $ifNull: ['$userData.name', 'Unknown']  // Set default name
                },
                email: {
                    $ifNull: ['$userData.email', 'Unknown']  // Set default name
                },
                age: {
                    $ifNull: ['$userData.age', 'Unknown']  // Set default name
                },
                gender: {
                    $ifNull: ['$userData.gender', 'Unknown']  // Set default name
                }
            }
        },
    )


    pipeline.push({
        $skip: skip,
    });
    pipeline.push({
        $limit: limit,
    });

    pipeline.push({
        $project: {
            _id: 1,
            createdAt: 1,
            name: 1,
            email: 1,
            age: 1,
            gender: 1,
            consultationId: 1,
        },
    });

    try {

        const patients = await OnlinePatient.aggregate(pipeline);
        
        if (patients.length === 0) {
            return res.status(204).send();
        }

        res.render('admin/components/tables/patient-table', {
            patients,
            success: true,
            page: page,
            online: true
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { searchOnlinePatients };