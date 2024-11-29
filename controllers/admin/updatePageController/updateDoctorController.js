const { validationResult } = require('express-validator');
const { getDoctorDetails } = require('../../../services/doctorAndUserService')
const { Department } = require('../../../models/departmentModel');

const updateDoctor = async (req, res) => {
    const title = 'Admin — Update Doctors';
    const primary = 'update-doctors';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/update/doctor-update', {
            title,
            primary,
            success: false,
            message: errors.array()[0].msg
        });
    }

    const { id: doctorId } = req.query;
    try {
        const doctor = await getDoctorDetails(doctorId);

        if (doctor.length === 0) {
            return res.render('admin/update/doctor-update', {
                title,
                primary,
                success: false,
                message: 'Invalid id'
            });
        }
        const departments = await Department.find()
                            .select('name -_id')
                            .sort({ name: 1 })
                            .lean();
        const departmentNames = departments.map(department => department.name);

        res.render('admin/update/doctor-update', {
            title,
            primary,
            doctor: doctor[0],
            departmentNames,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { updateDoctor };