const moment = require('moment');
const { validationResult } = require('express-validator');

const { Doctor } = require('../../models/doctorModel');
const { User } = require('../../models/userModel');
const { Consultation } = require('../../models/consultationModel');

const { getNextWeekday } = require('../../services/timeslot/getWeekService')
const { getSessionData } = require('../../services/loginService')

const { isLoggedIn } = require('../../utils/isLoggedIn');
const { isAdminOrStaff } = require('../../utils/isAdminOrStaff');

const bookConsultationView  = async (req, res) => {
    const primary = 'book-consultation';
    const userLoggedIn = isLoggedIn(req);
    const isAdmin = await isAdminOrStaff(req);
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('/doctors');
        }
        
        const { doctorId } = req.params;

        const doctor = await Doctor.findById(doctorId).populate('timeslotId');
        
        if (!doctor || !doctor.timeslotId) {
            return res.json({ 
                success: false, 
                message: 'No timeslot available.',
                userLoggedIn,
                isAdmin,
            });
        }

        const user = await User.findById(doctor.userId);

        const title = 'Dr. ' + user.name;

        const consultations = await Consultation.find({ doctorId: doctorId }).exec();

        const today = moment();
        const limitDate = today.clone().add(2, 'weeks');

        const availableSlots = [];

        doctor.timeslotId.availability.forEach(availability => {
            const dayOfWeek = availability.day; // e.g., "Monday", "Tuesday"
            // Calculate the date for this day within the 2-week period
            let dayDate = getNextWeekday(today, dayOfWeek);
            if (dayDate.isAfter(limitDate)) return; // Skip days after the 2-week period
            
            availability.timeSlots.forEach(slot => {
                const conflictingConsultation = consultations.some(consultation => {
                    const consultationStatus = consultation.status
                    const consultationDate = moment(consultation.consultationTime.date);
                    return consultationDate.isSame(dayDate, 'day') &&
                    consultation.consultationTime.startTime === slot.startTime &&
                    !['completed', 'cancelled'].includes(consultationStatus);
                });

                if (!conflictingConsultation) {
                    availableSlots.push({
                        day: availability.day,
                        date: dayDate.format('DD/MM/YYYY'),
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                    });
                }
            });
        });

        availableSlots.sort((a, b) => {
            const dateA = moment(a.date, 'DD/MM/YYYY');
            const dateB = moment(b.date, 'DD/MM/YYYY');
            if (dateA.isBefore(dateB)) return -1; // a comes before b
            if (dateA.isAfter(dateB)) return 1; // b comes before a
    
            // If the dates are the same, sort by startTime
            const timeA = moment(a.startTime, 'HH:mm');
            const timeB = moment(b.startTime, 'HH:mm');
            if (timeA.isBefore(timeB)) return -1; // a comes before b
            if (timeA.isAfter(timeB)) return 1; // b comes before a
            return 0; // They are the same
        });

        const userData = await getSessionData(req);
        if(!userData){
            return res.redirect('/login');
        }

        res.render('user/book-consultation', {
            title,
            primary,
            availableSlots,
            userData,
            userLoggedIn,
            isAdmin,
            success: true,
        });
    } catch (error) {
        console.error('Error rendering booking page:', error);
        return res.redirect('/doctors');
    }
};

module.exports = { bookConsultationView };