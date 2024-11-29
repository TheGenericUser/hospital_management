const { validationResult } = require('express-validator');

const { Department } = require('../../../models/departmentModel');

const updateDepartments = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: departmentId } = req.body;
    let { name } = req.body;

    name = name.replace(/\b\w/g, (char) => char.toUpperCase());

    try {

        const department = await Department.findByIdAndUpdate(
            departmentId, 
            { name },
            { new: false }
        );

        if (!department) {
            return res.status(404).json({ succes : false, message: 'Server Error.' });
        }
        
        return res.status(201).json({ success: true, message: 'Department successfully modified!' });
    }catch (error) {
        console.error('Error modifying a department:', error);
    
        return res.status(500).json({ success: false, message: 'Server Error.' });      
    }
};

module.exports = { updateDepartments };