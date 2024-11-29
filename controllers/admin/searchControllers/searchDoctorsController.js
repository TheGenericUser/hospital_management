const { validationResult } = require('express-validator');
const { Doctor } = require('../../../models/doctorModel');
const mongoose = require('mongoose');


const searchDoctors = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: doctorId, name, email, mobile, department, createdBefore, createdAfter, page } = req.query;
    const limit = parseInt(process.env.DOCTORS_PAGINATION_LIMIT, 10) || 10;  // Default to 10 if not set
    const skip = (parseInt(page, 10) - 1) * limit;

    let userQuery = {};
    let doctorQuery = {};
    let departmentQuery = {};

    if (doctorId) doctorQuery._id = new mongoose.Types.ObjectId(`${doctorId}`);

    if (mobile) doctorQuery.phoneNumber = mobile;

    if (name) userQuery['userData.name'] = { $regex: name, $options: 'i' };  // Case-insensitive search for name
    if (email) userQuery['userData.email'] = { $regex: email, $options: 'i' };  // Case-insensitive search for email
    userQuery['userData.role'] = 'doctor';

    if (department && department !== 'na') departmentQuery.name = department;

    if (createdBefore) doctorQuery.createdAt = { ...doctorQuery.createdAt, $lte: new Date(createdBefore) };

    if (createdAfter) doctorQuery.createdAt = { ...doctorQuery.createdAt, $gte: new Date(createdAfter) };

    let pipeline = [
        {
            $match: doctorQuery,  // Match doctors based on the initial doctor query
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
        {
            $lookup: {
                from: 'departments',
                localField: 'departmentId',
                foreignField: '_id',
                as: 'departmentData',
            },
        },
        {
            $unwind: { path: '$departmentData', preserveNullAndEmptyArrays: true },
        },

    ];
    if (Object.keys(userQuery).length > 0) {
        pipeline.push({
            $match: userQuery
        });
    }


    if (departmentQuery.name) {
        pipeline.push({
            $match: { 'departmentData.name': departmentQuery.name },
        });
    }


    pipeline.push({
        $skip: skip,
    });
    pipeline.push({
        $limit: limit,
    });

    pipeline.push({
        $project: {
            _id: 1,
            phoneNumber: 1,
            createdAt: 1,
            updatedAt: 1,
            userData: {
                name: 1,
                email: 1,
            },
            departmentData: {
                name: 1,
            },
        },
    });

    try {

        const doctors = await Doctor.aggregate(pipeline);
        
        if (doctors.length === 0) {
            return res.status(204).send();
        }

        res.render('admin/components/tables/doctor-table', {
            data: doctors,
            success: true,
            page: page
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { searchDoctors };