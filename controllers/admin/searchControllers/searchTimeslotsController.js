const path = require('path');
const ejs = require('ejs');
const { validationResult } = require('express-validator');
const moment = require('moment');

const { Doctor } = require('../../../models/doctorModel');
const { Consultation } = require('../../../models/consultationModel');

const { getNextWeekday } = require('../../../services/timeslot/getWeekService')

const searchTimeslots = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: doctorId } = req.query;
    try {
        const doctor = await Doctor.findById(doctorId).populate('timeslotId');  // Assuming timeslotId is populated
        
        if (!doctor || !doctor.timeslotId) {
            return res.json({ success: false, message: 'No timeslot available.' });
        }

        const consultations = await Consultation.find({ doctorId: doctorId }).exec();

        // Get today's date and the limit (2 weeks from today)
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

        ejs.renderFile(path.join(__dirname, '../../../views/admin/components/misc/doctor-timeslot.ejs'), { availableSlots }, (err, htmlContent) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error rendering HTML' });
            }
            res.json({ success: true, htmlContent, availableSlots });
        });
        // const htmlContent = res.render('admin/components/misc/doctor-timeslot', { availableSlots });

        // res.json({ htmlContent, availableSlots });


    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { searchTimeslots };