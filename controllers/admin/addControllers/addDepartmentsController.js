const { validationResult } = require('express-validator');

const { Department } = require('../../../models/departmentModel');

const addDepartments = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    let { name } = req.body;
    name = name.replace(/\b\w/g, (char) => char.toUpperCase());

    try {        
        const departmentData = {
            name,
        };

        const department = new Department(departmentData);
        await department.save();
        
        return res.status(201).json({ success: true, message: 'Department successfully added!' });
    }catch (error) {
        console.error('Error making a department:', error);
    
        return res.status(500).json({ success: false, message: 'Server Error.' });      
    }
};

module.exports = { addDepartments };