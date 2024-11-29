const { getOnlinePatientDetailsWithReportCount } = require('../../services/onlinePatientAndReport');

const onlinePatientAdminController  = async (req, res) => {
    try {
        const title = 'Admin — Online Patients';
        const primary = 'online-patients';
        // const limit = parseInt(process.env.ONLINE_PATIENTS_PAGINATION_LIMIT, 10) || 10;

        // let patients;
        // if(totalPages > 0){
        //     const sortBy = 'createdAt';
        //     patients = await getOnlinePatientDetailsWithReportCount(skip, limit, sortBy);
        // }
        // console.log(patients[0]);
        // console.log(patients[0].reportCount);
        // console.log(patients[0]);

        // patients[0].reportDetails.reports
        res.render('admin/online-patients', {
            title,
            primary,
            success: true,
        });
    } catch (error) {
        console.error('Error rendering user patients page:', error);
        res.status(500).render('admin/walkin-patients', {
            title,
            primary,
            success: false,
            message: 'Server Error.',
        });
    }
};

module.exports = { onlinePatientAdminController };