const { validationResult } = require('express-validator');

const { Consultation } = require('../../../models/consultationModel');
const { Doctor } = require('../../../models/doctorModel');
const { User } = require('../../../models/userModel');
const { Department } = require('../../../models/departmentModel');

const updateConsultation = async (req, res) => {
    const title = 'Admin — Update Consultation';
    const primary = 'consultation-update';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/update/consultation-update', {
            title,
            primary,
            success: false,
            message: errors.array()[0].msg
        });
    }

    const { id: consultationId } = req.query;
    try {
        const consultation = await Consultation.findById(consultationId);

        if (!consultation) {
            return res.render('admin/update/consultation-update', {
                title,
                primary,
                success: false,
                message: 'Consultation not found'
            });
        }

        const doctor = await Doctor.findById(consultation.doctorId)

        const user = await User.findById(doctor.userId);  // Assuming User has the name field

        if (!user) {
            return res.render('admin/update/consultation-update', {
                title,
                primary,
                success: false,
                message: 'Doctor user not found',
            });
        }

        const department = await Department.findById(doctor.departmentId);
        
        if (!department) {
            return res.render('admin/update/consultation-update', {
                title,
                primary,
                success: false,
                message: 'Doctor department not found',
            });
        }

        res.render('admin/update/consultation-update', {
            title,
            primary,
            success: true,
            message: 'Consultation details fetched successfully',
            consultation: {
                date: consultation.consultationTime.date,
                startTime: consultation.consultationTime.startTime,
                endTime: consultation.consultationTime.endTime,
                status: consultation.status,
            },
            doctor: {
                name: user.name,
                department: department.name,
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { updateConsultation };