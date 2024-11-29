const { validationResult } = require('express-validator');

const { getDoctorDetails } = require('../../services/doctorAndUserService');
const { isLoggedIn } = require('../../utils/isLoggedIn');
const { isAdminOrStaff } = require('../../utils/isAdminOrStaff');

const doctorsInfoView  = async (req, res) => {
    const primary = 'doctors-info';
    const userLoggedIn = isLoggedIn(req);
    const isAdmin = await isAdminOrStaff(req);
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('/doctors');
        }
        
        const { doctorId } = req.params;
        
        const doctors = await getDoctorDetails(doctorId);
        const doctor = doctors[0];
        
        const title = 'Dr. ' + doctor.name;

        res.render('user/doctors-info', {
            title,
            primary,
            doctor,
            userLoggedIn,
            isAdmin,
        });
    } catch (error) {
        console.error('Error rendering doctors info page:', error);
        return res.redirect('/doctors');
    }
};

module.exports = { doctorsInfoView };