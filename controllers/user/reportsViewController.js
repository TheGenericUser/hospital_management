const { OnlinePatient } = require('../../models/onlinePatientModel');
const { Report } = require('../../models/reportModel');

const { getDecryptedCookie } = require('../../services/userCookieService');
const { isLoggedIn } = require('../../utils/isLoggedIn');
const { isAdminOrStaff } = require('../../utils/isAdminOrStaff');


const reportsView  = async (req, res) => {
    const title = 'Lab Reports';
    const primary = 'lab-reports';
    const userLoggedIn = isLoggedIn(req);
    const isAdmin = await isAdminOrStaff(req);
    try {
        const userId = getDecryptedCookie(req);
        const patient = await OnlinePatient.findOne({ userId: userId });
                
        if(!patient){
            return res.render('user/lab-reports', {
                title,
                primary,
                userLoggedIn,
                isAdmin,
                reports: false,
            });
        }
        
        const labreports = await Report.findById(patient.labReportId)
                        .select('reports._id reports.filename');

        if(!labreports){
            return res.render('user/lab-reports', {
                title,
                primary,
                userLoggedIn,
                isAdmin,
                reports: false,
            });
        }

        res.render('user/lab-reports', {
            title,
            primary,
            labreports,
            userLoggedIn,
            isAdmin,
            reports: true,
        });
    } catch (error) {
        console.error('Error rendering booking page:', error);
        return res.redirect('/doctors');
    }
};

module.exports = { reportsView };