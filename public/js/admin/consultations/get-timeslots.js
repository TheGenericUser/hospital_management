document.getElementById('consultation-doctor-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
        // Get the selected doctor ID
        const doctorId = document.getElementById('doctor').value;

        // Prepare search parameters
        const searchParams = new URLSearchParams();
        searchParams.append('id', doctorId);
        
        // Make an AJAX request to get available time slots for the doctor
        const response = await fetch(`/api/searchTimeslot?` + searchParams.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if(data.success){
            document.getElementById('getSchedule').innerHTML = data.htmlContent;
                    // Store available slots as an array, not as a string
            const availableSlots = data.availableSlots;

            // Attach the event listener for date selection once availableSlots is set
            const consultationDateSelect = document.getElementById('consultation-date');
            const consultationTimeSelect = document.getElementById('consultation-time');

            // Store the listener in a variable
            const handleChange = function() {
                const selectedDate = consultationDateSelect.value;
                if (selectedDate) {
                    populateTimeSlots(availableSlots, selectedDate, consultationTimeSelect);
                } else {
                    consultationTimeSelect.innerHTML = '<option value="">--Select a Time--</option>';
                }
            };

            if (consultationDateSelect) {
                consultationDateSelect.removeEventListener('change', handleChange);
            }

            // Attach the event listener
            consultationDateSelect.addEventListener('change', handleChange);
        }else{
            document.getElementById('getSchedule').innerHTML = '';
        }


    } catch (error) {
        console.error('Error:', error);
    }
});

// This function is responsible for populating the time slots based on the selected date
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