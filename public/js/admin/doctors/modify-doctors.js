const urlParams = new URLSearchParams(window.location.search);
document.getElementById(`doctor-modify-form`).addEventListener('submit', function (e) {
    e.preventDefault();

    const availability = [];

    document.querySelectorAll('.timeslot-entry').forEach(entry => {
        const day = entry.querySelector('.day-select').value;
        const startTime = entry.querySelector('[name="startTime"]').value;
        const endTime = entry.querySelector('[name="endTime"]').value;

        if (!startTime || !endTime) {
            return;
        }

        const start = new Date(`1970-01-01T${startTime}:00Z`);
        const end = new Date(`1970-01-01T${endTime}:00Z`);

        if (end <= start) {
            return;
        }

        if (!availability.some(daySlot => daySlot.day === day)) {
            availability.push({ day, timeSlots: [{ startTime, endTime }] });
        } else {
            const existingDay = availability.find(daySlot => daySlot.day === day);
            existingDay.timeSlots.push({ startTime, endTime });
        }
    });

    console.log(availability);

    const doctorData = new FormData();
    doctorData.append('id', urlParams.get('id'));
    doctorData.append('name', document.getElementById('name').value);
    doctorData.append('email', document.getElementById('email').value);
    doctorData.append('mobile', document.getElementById('mobile').value);
    doctorData.append('department', document.getElementById('department').value);
    doctorData.append('education', getFieldValues('education'));
    doctorData.append('language', getFieldValues('languages'));
    doctorData.append('award', getFieldValues('awards'));
    doctorData.append('doctorPicture', document.getElementById('doctor-image-input').files[0]);
    doctorData.append('timeSlot', JSON.stringify(availability));


    console.log(doctorData);
    fetch('/api/updateDoctors', {
        method: 'POST',
        body: doctorData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            showNotification(data.message, 1000*10);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});


function getFieldValues(fieldName) {
    const values = [];
    // Use querySelectorAll to select all inputs with the given name (including the '[]' in the name attribute)
    const inputs = document.querySelectorAll(`input[name="${fieldName}[]"]`);
    
    inputs.forEach(input => {
        // Only add non-empty, trimmed values to the array
        if (input.value.trim() !== '') {
            values.push(input.value.trim());
        }
    });
    
    // Return a JSON string of the array, or "null" if no values were found
    return JSON.stringify(values.length > 0 ? values : null);
}