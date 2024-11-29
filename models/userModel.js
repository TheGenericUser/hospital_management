const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 256,
    },
    password: {
        type: String,
        required: true,
        minlength: 60,
        maxlength: 60,
        select: false, 
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
        default: null,
    },
    gender: { 
        type: String,
        enum: ['male', 'female', 'other'],
        default: null,
    },
    role:{
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'doctor', 'staff', 'admin'], 
    },
    remember_me:{
        type: String,
        default: null,
        minlength: 64,
        maxlength: 64,
    },
    activeSession: {
        type: String,
        default: null,
        minlength: 32,
        maxlength: 32,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };


// create()	Creates and saves a document.
// find()	Finds documents based on criteria.
// findById()	Finds a document by _id.
// findOne()	Finds a single document matching criteria.
// updateOne()	Updates a single document.
// deleteOne()	Deletes a single document.
// countDocuments()	Counts documents matching criteria.
// aggregate()	Performs aggregation operations.
// save()	Saves the document.
// remove()	Removes the document.
// lean()	Returns plain JavaScript objects instead of Mongoose documents.



// type	Specifies the data type of the field.
// required	Field must be present when creating a document.
// unique	Field must be unique across documents.
// default	Sets a default value for the field if not provided.
// enum	Limits the field to a specific set of values.
// min	Minimum value for numeric fields.
// max	Maximum value for numeric fields.
// minlength	Minimum length for string fields.
// maxlength	Maximum length for string fields.
// trim	Removes whitespace from both ends of a string.
// lowercase	Converts string values to lowercase.
// uppercase	Converts string values to uppercase.
// immutable	Field cannot be changed after it is set.
// select	Determines if the field is included in query results.