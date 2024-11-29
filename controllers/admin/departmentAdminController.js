require('dotenv').config();
const { Department } = require('../../models/departmentModel')

const departmentAdminController  = async (req, res) => {
    try {
        const { totalPages, validatedPage: page, skip } = req;

        const title = 'Admin — Departments';
        const primary = 'departments';
        const limit = parseInt(process.env.DEPARTMENT_PAGINATION_LIMIT, 10) || 10;

        let departments;
        if(totalPages > 0){
            const sortBy = 'name';
            departments = await Department.find().sort({ [sortBy] : 1 }).skip(skip).limit(limit);
        }else{
            departments = null;
        }

        res.render('admin/departments', {
            title,
            primary,
            success: true,
            data: departments,
            totalPages,
            page,
            limit,
        });
    } catch (error) {
        console.error('Error rendering user departments page:', error);
        res.status(500).render('admin/departments', {
            title,
            primary,
            success: false,
            message: 'Server Error.',
        });
    }
};

module.exports = { departmentAdminController };