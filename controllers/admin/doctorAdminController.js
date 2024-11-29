const { Department } = require('../../models/departmentModel')

const doctorAdminController  = async (req, res) => {
    try {
        const title = 'Admin — Doctors';
        const primary = 'doctors';

        const departments = await Department.find()
        .select('name -_id')
        .sort({ name: 1 })
        .lean();
        const departmentNames = departments.map(department => department.name);

        res.render('admin/doctors', {
            title,
            primary,
            success: true,
            departmentNames,
        });
    } catch (error) {
        console.error('Error rendering user doctors page:', error);
        res.status(500).render('admin/doctors', {
            title,
            primary,
            success: false,
            message: 'Server Error.',
        });
    }
};

module.exports = { doctorAdminController };