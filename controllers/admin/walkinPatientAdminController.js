const walkinPatientAdminController  = async (req, res) => {
    try {
        const title = 'Admin — Walkin Patients';
        const primary = 'walkin-patients';

        res.render('admin/walkin-patients', {
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

module.exports = { walkinPatientAdminController };