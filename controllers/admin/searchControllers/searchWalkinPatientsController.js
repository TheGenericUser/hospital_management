const { validationResult } = require('express-validator');

const { WalkinPatient } = require('../../../models/walkinPatientModel');

const searchWalkinPatients = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: patientId, name, email, gender, ageBelow, ageAbove, createdBefore, createdAfter, page } = req.query;

    const limit = parseInt(process.env.WALKIN_PATIENTS_PAGINATION_LIMIT, 10) || 10;  // Default to 10 if not set
    const skip = (parseInt(page, 10) - 1) * limit;

    let query = {};
    if (patientId) query._id = patientId;

    if (name) query.name = { $regex: name, $options: 'i' };  // Case-insensitive search

    if (email) query.email = { $regex: email, $options: 'i' };  // Case-insensitive search

    if (gender && gender !== 'na') query.gender = gender;

    if (ageBelow) query.age = { ...query.age, $lte: ageBelow };

    if (ageAbove) query.age = { ...query.age, $gte: ageAbove  };

    if (createdBefore) query.createdAt = { ...query.createdAt, $lte: new Date(createdBefore) };

    if (createdAfter) query.createdAt = { ...query.createdAt, $gte: new Date(createdAfter) };

    try {

        const patients = await WalkinPatient.find(query, {
            labReportId: 0,
            __v: 0
        })
        .skip(skip)
        .limit(limit);

        if (patients.length === 0) {
            return res.status(204).send();
        }

        res.render('admin/components/tables/patient-table', {
            patients,
            success: true,
            page: page,
            online: false,
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { searchWalkinPatients };