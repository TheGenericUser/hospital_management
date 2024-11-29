const { OnlinePatient } = require('../models/onlinePatientModel');
const { Report } = require('../models/reportModel');

const manageOnlinePatient = async (userId) => {
    try {
        const patient = await OnlinePatient.findOneAndDelete({ userId });  // Find and delete based on userId (foreign key)
        if (!patient) {
            return { message: 'Patient not found.' };  // Return a message if patient doesn't exist
        }
        
        if (patient.labReportId) {
            await Report.findByIdAndDelete(patient.labReportId);
        }

        return { message: 'Patient and associated report (if any) deleted successfully.' };
    } catch (error) {
        console.error('Error managing doctor profile:', error.message);
    }
};

module.exports = { manageOnlinePatient }