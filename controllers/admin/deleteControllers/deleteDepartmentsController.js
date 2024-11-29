require('dotenv').config()

const { validationResult } = require('express-validator');

const { Department } = require('../../../models/departmentModel');

const deleteDepartments = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: departmentId } = req.body;

    try {
        const user = await Department.findByIdAndDelete(departmentId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Server Error' });
        }        

        return res.status(200).json({ success: true, message: 'Department deleted successfully' });
    }catch (error) {
        console.error('Error deleting department:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { deleteDepartments };