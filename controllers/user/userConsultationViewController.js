const { OnlinePatient } = require('../../models/onlinePatientModel');

const { getDecryptedCookie } = require('../../services/userCookieService');
const { getConsultations } = require('../../services/user/getConsultations');
const { isLoggedIn } = require('../../utils/isLoggedIn');
const { isAdminOrStaff } = require('../../utils/isAdminOrStaff');

const userConsultationView  = async (req, res) => {
    const title = 'Your Consultations';
    const primary = 'my-consultations';
    const userLoggedIn = isLoggedIn(req);
    const isAdmin = await isAdminOrStaff(req);
    try {
        const userId = getDecryptedCookie(req);
        
        if(!userId){
            return res.redirect('/login');
        }

        const patient = await OnlinePatient.findOne({userId: userId});

        if(!patient || !patient.consultationId){
            return res.render('user/past-consultations', {
                title,
                primary,
                userLoggedIn,
                isAdmin,
                success: false,
            });
        }

        const consultations = await getConsultations(patient._id);

        res.render('user/past-consultations', {
            title,
            primary,
            userLoggedIn,
            isAdmin,
            consultations,
            success: true,
        });
    } catch (error) {
        console.error('Error rendering booking page:', error);
        return res.redirect('/doctors');
    }
};

module.exports = { userConsultationView };