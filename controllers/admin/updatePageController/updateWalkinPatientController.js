const { validationResult } = require('express-validator');
const { getWalkinPatientDetailsWithReportCount } = require('../../../services/walkinPatientAndReport');

const updateWalkinPatient = async (req, res) => {
    const title = 'Admin — Update Walkin Patient';
    const primary = 'update-walkin-patients';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/update/walkin-patient-update', {
            title,
            primary,
            success: false,
            message: errors.array()[0].msg
        });
    }

    const { id: patientId } = req.query;
    try {
        const patient = await getWalkinPatientDetailsWithReportCount(patientId);

        if (patient.length === 0) {
            return res.render('admin/update/walkin-patient-update', {
                title,
                primary,
                success: false,
                message: 'Invalid id'
            });
        }

        res.render('admin/update/walkin-patient-update', {
            title,
            primary,
            patient: patient[0],
            online: false,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { updateWalkinPatient };