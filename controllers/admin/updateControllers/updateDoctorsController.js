const { validationResult } = require('express-validator');
const { User } = require('../../../models/userModel');
const { Department } = require('../../../models/departmentModel');
const { Doctor } = require('../../../models/doctorModel');
const { Timeslot } = require('../../../models/doctorTimeslotModel');
const { deleteImage } = require('../../../services/deleteImage')

const updateDoctors= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if(req.filepath){
            const deleteResult = deleteImage(req.filepath);
            console.log(deleteResult.message);
        }
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: doctorId, name, email, mobile: mobileNumber, department: doctorDepartment } = req.body;
    let { education, language, award, timeSlot } = req.body;

    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            throw new Error('Server Error');
        }

        education = JSON.parse(education);
        language = JSON.parse(language);
        award = (!award) ? null : JSON.parse(award);
        timeSlot = JSON.parse(timeSlot);

        doctor.phoneNumber = mobileNumber;

        doctor.education = Array.isArray(education) && education.length > 0 ? education : [];
        doctor.languagesSpoken = Array.isArray(language) && language.length > 0 ? language : [];
        doctor.awards = Array.isArray(award) && award.length > 0 ? award : null;

        await User.findByIdAndUpdate(doctor.userId, 
            {   name: name,
                email: email
            });
        const departmentModel = await Department.findOne({ name: doctorDepartment });

        doctor.departmentId = departmentModel._id;
        
        if(req.filepath){
            if(doctor.imagePath){
                const deleteResult = deleteImage(doctor.imagePath);
                console.log(deleteResult.message);
            }
            doctor.imagePath = req.filepath;
        }


        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        timeSlot.sort((a, b) => {
            return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        });

        let timeslotData;
        if(doctor.timeslotId){
            timeslotData = await Timeslot.findById(doctor.timeslotId);
            if (!timeslotData) {
                timeslotData = new Timeslot({
                    doctorId,
                    availability: timeSlot
                });
            }
            timeslotData.availability = timeSlot;
        }else{
            timeslotData = new Timeslot({
                doctorId,
                availability: timeSlot
            });
        }

        await timeslotData.save();
        
        doctor.timeslotId = timeslotData._id

        await doctor.save();
        
        return res.status(200).json({ success: true, message: 'Doctor information changed!' });
    }catch (error) {
        console.error('Error updating doctor:', error);
        if(req.filepath){
            const deleteResult = deleteImage(req.filepath);
            console.log(deleteResult.message);
        }
        return res.status(500).json({ success: false, message: 'Server Error.' });      
    }
};

module.exports = { updateDoctors };