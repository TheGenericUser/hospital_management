const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 256,
    },
}, { timestamps: true });


const Department = mongoose.model('Department', departmentSchema);

module.exports = { Department };