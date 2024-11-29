const { getDoctorDetails } = require('../../services/user/getDoctorDetails');
const { isLoggedIn } = require('../../utils/isLoggedIn');
const { isAdminOrStaff } = require('../../utils/isAdminOrStaff');
    
const doctorsView  = async (req, res) => {
    const title = 'Doctors';
    const primary = 'doctors';
    const userLoggedIn = isLoggedIn(req);
    const isAdmin = await isAdminOrStaff(req);
    try {
        const sortBy = 'createdAt';
        const doctors = await getDoctorDetails(sortBy);

        res.render('user/doctors', {
            title,
            primary,
            doctors,
            userLoggedIn,
            isAdmin,
        });
    } catch (error) {
        console.error('Error rendering doctors page:', error);
        res.render('user/doctors', {
            title,
            primary,
            doctors: null,
            success: false,
            userLoggedIn,
            isAdmin,
        });
    }
};

module.exports = { doctorsView };