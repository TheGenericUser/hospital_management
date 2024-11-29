const { validationResult } = require('express-validator');
const { getOnlinePatientDetailsWithReportCount } = require('../../../services/onlinePatientAndReport');

const updateOnlinePatient = async (req, res) => {
    const title = 'Admin — Update Online Patient';
    const primary = 'update-online-patients';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/update/online-patient-update', {
            title,
            primary,
            success: false,
            message: errors.array()[0].msg
        });
    }

    const { id: patientId } = req.query;
    try {
        const patient = await getOnlinePatientDetailsWithReportCount(patientId);

        if (patient.length === 0) {
            return res.render('admin/update/online-patient-update', {
                title,
                primary,
                success: false,
                message: 'Invalid id'
            });
        }

        res.render('admin/update/online-patient-update', {
            title,
            primary,
            patient: patient[0],
            online: true,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { updateOnlinePatient };