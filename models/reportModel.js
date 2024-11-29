const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reports: [{
        report: {
            type: String,
            required: true
        },
        iv: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    }],
}, { timestamps: true});

const Report = mongoose.model('Report', reportSchema);

module.exports = { Report };