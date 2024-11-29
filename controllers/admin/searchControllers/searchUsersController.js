const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');

const searchUsers = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: userId, name, email, role, createdBefore, createdAfter, gender, ageBelow, ageAbove, page } = req.query;

    let query = {};
    if (userId) query._id = userId;

    if (name) query.name = { $regex: name, $options: 'i' };  // Case-insensitive search

    if (email) query.email = { $regex: email, $options: 'i' };  // Case-insensitive search

    if (role && role !== 'na') query.role = role;

    if (gender && gender !== 'na') query.gender = gender;

    if (ageBelow) query.age = { ...query.age, $lte: ageBelow };

    if (ageAbove) query.age = { ...query.age, $gte: ageAbove  };

    if (createdBefore) query.createdAt = { ...query.createdAt, $lte: new Date(createdBefore) };

    if (createdAfter) query.createdAt = { ...query.createdAt, $gte: new Date(createdAfter) };

    try {

        const limit = process.env.USERS_PAGINATION_LIMIT;
        const skip = (page - 1) * limit;

        const users = await User.find(query, {
            remember_me: 0,
            activeSession: 0,
            __v: 0
        })
        .skip(skip)
        .limit(limit);


        if (users.length === 0) {
            return res.status(204).send();
        }

        res.render('admin/components/tables/user-table', {
            users,
            success: true,
            page: page
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { searchUsers };