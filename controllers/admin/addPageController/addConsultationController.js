const { validationResult } = require('express-validator');
const { WalkinPatient } = require('../../../models/walkinPatientModel');
const { User } = require('../../../models/userModel');
const { Doctor } = require('../../../models/doctorModel');


const addConsultation = async (req, res) => {
    const title = 'Admin — Add Consultation';
    const primary = 'add-consultation';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/add/add-consultation', {
            title,
            primary,
            success: false,
            message: errors.array()[0].msg
        });
    }
    //department: name and doctor. so( Doctor: Specializatio). select. thats the form. then  as user submits, i send the schedule of doc.
    const { id: patientId } = req.query;
    try {
        const patient = await WalkinPatient.findById(patientId);

        if (!patient) {
            return res.render('admin/add/add-consultation', {
                title,
                primary,
                success: false,
                message: 'Invalid id'
            });
        }

        const doctors = await User.find({ role: 'doctor' }).select('_id name'); // Only select _id and name

        if (!doctors || doctors.length === 0) {
            return { message: 'No doctors found' };
        }

        const doctorDetails = await Promise.all(
            doctors.map(async (user) => {
                // 3. Find the doctor by userId and populate departmentId
                const doctor = await Doctor.findOne({ userId: user._id })
                    .populate({
                        path: 'departmentId',
                        select: 'name', // Only fetch department name
                    })
                    .exec();

                // 4. Structure the result for each doctor
                const doctorName = user.name;  // The name of the doctor from the User model
                const departmentName = doctor && doctor.departmentId ? doctor.departmentId.name : 'N.A.';

                return {
                    id: doctor._id,
                    doctorName: doctorName,
                    departmentName: departmentName
                };
            })
        );

        res.render('admin/add/add-consultation', {
            title,
            primary,
            doctors: doctorDetails,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching page:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { addConsultation };