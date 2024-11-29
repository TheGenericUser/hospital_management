const { Doctor } = require('../models/doctorModel');

const manageDoctorProfile = async (userId, role) => {
    try {
        // Step 1: Check if the doctor profile exists
        const doctor = await Doctor.findOne({ userId });

        // Step 2: If doctor profile exists
        if (doctor) {
            if (role === 'doctor') {
                console.log('Doctor profile exists, no changes made.');
                return;
            } else {
                await Doctor.deleteOne({ userId });
                console.log('Doctor profile removed.');
            }
        } else {
            if (role === 'doctor') {
                const doctorData = {
                    userId,
                };
                const doctor = new Doctor(doctorData);
                await doctor.save();
                console.log('Doctor profile created.');
            } else {
                console.log('No doctor profile created, role is not "doctor".');
            }
        }
    } catch (error) {
        console.error('Error managing doctor profile:', error.message);
    }
};

module.exports = { manageDoctorProfile }