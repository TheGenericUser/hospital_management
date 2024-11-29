const { validationResult } = require('express-validator');
const { Report } = require('../models/reportModel');
const { OnlinePatient } = require('../models/onlinePatientModel');
const { decryptBuffer } = require('../services/encryptAndDecrypt')
const { getSessionData } = require('../services/loginService')
const { getDecryptedCookie } = require('../services/userCookieService');

const getReport  = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array()[0].msg });
    }

    try {
        const { reportId, reportCount, arrayIndex: reportNumber } = req;

        let report, pdfBuffer, userId;
        if(reportCount > 0){
            const patient = await OnlinePatient.findOne({ labReportId: reportId });
            userId = patient ? patient.userId : null;
            report = await Report.findOne({ _id: reportId },
                { reports: { $slice: [reportNumber, 1] } });
            const ivBase64 = report.reports[0].iv;
            const reportBase64 = report.reports[0].report;
            pdfBuffer = decryptBuffer(reportBase64, ivBase64);
        }else{
            pdfBuffer = null;
        }
        if(userId){
            const id = getDecryptedCookie(req);
            const role = await getSessionData(req);
            if(id != userId){
                if (role && (role.value.role === 'admin'||role.value.role === 'staff')){
                }else{
                    return res.redirect('/');
                }       
            }
        }

        res.contentType("application/pdf"); // Set the response type as PDF
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error rendering reports page:', error);
        res.redirect('/')
    }
};

module.exports = { getReport };