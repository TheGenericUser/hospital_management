const { validationResult } = require('express-validator');

const { OnlinePatient } = require('../../../models/onlinePatientModel');
const { User } = require('../../../models/userModel');
const { Report } = require('../../../models/reportModel');

const { encryptBuffer } = require('../../../services/encryptAndDecrypt');

const updateOnlinePatients= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: patientId, name, email, age, gender, reportNumbers } = req.body;

    const files = req.file ? [req.file] : req.files;

    try {
        let reportDocument;
        let patient = await OnlinePatient.findById(patientId);
        
        const user = await User.findById(patient.userId);

        if (!patient) {
            throw new Error('Patient not found');
        }
        if (!user) {
            throw new Error('User not found');
        }

        if(patient.labReportId){
            reportDocument = await Report.findById(patient.labReportId);
            if (!reportDocument) {
                throw new Error('report not found');
            }

            //delete
            if(reportDocument){
                if(reportNumbers !== 'null'){
                    const reportArray = reportNumbers.split(',').map(Number);

                    let deleteReportIndexes = [];  // Array to store missing report indexes
                    for (let i = 0; i < reportDocument.reports.length; i++) {  // Fix the loop condition to go through all reports
                        if (!reportArray.includes(i+1)) {
                            deleteReportIndexes.push(i);
                        }
                    }
                    if(Array.isArray(deleteReportIndexes) && deleteReportIndexes.length > 0){
                        reportDocument.reports = reportDocument.reports.filter((_, index) => !deleteReportIndexes.includes(index));
                    }
                }else{
                    await Report.deleteOne({ _id: reportDocument._id });
                    patient = await OnlinePatient.findByIdAndUpdate(
                        patientId,
                        {
                          $unset: { labReportId: "" }
                        },
                        { new: true }
                    );
                    reportDocument = null;
                }
            }
        }

        if (Array.isArray(files) && files.length > 0){
            //if file then add
            const encryptedFiles = [];
            
            files.forEach(file => {
                const fileName = file.originalname;
                const { encryptedData, iv } = encryptBuffer(file.buffer);

                encryptedFiles.push({
                    report: encryptedData,
                    iv: iv,
                    filename: fileName,
                });
            });

            if(reportDocument){
                reportDocument.reports.push(...encryptedFiles);  // Using spread operator to add multiple files
            }else{
                reportDocument = new Report({
                    reports: encryptedFiles
                });
            }
            await reportDocument.save()
        }


        if (reportDocument && reportDocument.reports.length === 0) {
            await Report.deleteOne({ _id: reportDocument._id });
            patient = await OnlinePatient.findByIdAndUpdate(
                patientId,
                {
                  $unset: { labReportId: "" }
                },
                { new: true }
            );
            reportDocument = null;
        }

        user.name = name;
        user.email = email;
        user.age = age;
        user.gender = gender;
        if(Array.isArray(files) && files.length > 0) patient.labReportId = reportDocument._id;
        
        await user.save();
        await patient.save();
        
        return res.status(200).json({ success: true, message: 'Patient information changed!' });
    }catch (error) {
        console.error('Error updating patient:', error);
    
        if (error.message === 'Patient not found') {
            return res.status(404).json({ success: false, message: 'Server Error' });
        }
        return res.status(500).json({ success: false, message: 'Server Error.' });      
    }
};

module.exports = { updateOnlinePatients };