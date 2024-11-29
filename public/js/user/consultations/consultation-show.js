const consultationDateSelect = document.getElementById('consultation-date');
const consultationTimeSelect = document.getElementById('consultation-time');

const handleChange = function() {
    const selectedDate = consultationDateSelect.value;
    if (selectedDate) {
        populateTimeSlots(availableSlots, selectedDate, consultationTimeSelect);
    } else {
        consultationTimeSelect.innerHTML = '<option value="">--Select a Time--</option>';
    }
};

consultationDateSelect.addEventListener('change', handleChange);

function populateTimeSlots(availableSlots, selectedDate, consultationTimeSelect) {
    // Filter available slots for the selected date
    const selectedSlots = availableSlots.filter(slot => slot.date === selectedDate);

    // Clear the time slot dropdown
    consultationTimeSelect.innerHTML = '<option value="">--Select a Time--</option>';

    // Populate the time slot dropdown with available times for the selected date
    selectedSlots.forEach(function(slot) {
        const option = document.createElement('option');
        option.value = `${slot.startTime}_${slot.endTime}`; // Value is a combination of start and end time
        option.textContent = `${slot.startTime} to ${slot.endTime}`;
        consultationTimeSelect.appendChild(option);
    });
}