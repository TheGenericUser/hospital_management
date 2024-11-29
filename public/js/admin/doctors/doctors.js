document.getElementById('addEducation').addEventListener('click', function() {
    const educationDiv = document.getElementById('educationInputs');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.classList.add('form-control', 'mb-2');
    newInput.name = 'education[]';
    newInput.placeholder = 'Enter education qualification';
    educationDiv.appendChild(newInput);
});

document.getElementById('addLanguage').addEventListener('click', function() {
    const languageDiv = document.getElementById('languageInputs');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.classList.add('form-control', 'mb-2');
    newInput.name = 'languages[]';
    newInput.placeholder = 'Enter language';
    languageDiv.appendChild(newInput);
});

document.getElementById('addAward').addEventListener('click', function() {
    const awardDiv = document.getElementById('awardInputs');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.classList.add('form-control', 'mb-2');
    newInput.name = 'awards[]';
    newInput.placeholder = 'Enter award';
    awardDiv.appendChild(newInput);
});

function previewImage(event) {
    const image = document.getElementById('image');
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function() {
        image.src = reader.result;
        image.style.display = 'block';
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const addTimeSlotButtons = document.querySelectorAll('.add-time-slot');
    const removeTimeSlotButtons = document.querySelectorAll('.remove-time-slot');

    // Add Time Slot
    addTimeSlotButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dayAvailability = this.closest('.day-availability');
            const timeSlotDiv = document.createElement('div');
            timeSlotDiv.classList.add('time-slot');
            
            timeSlotDiv.innerHTML = `
                <input type="time" name="availability[${dayAvailability.querySelector('select').value}][timeSlots][startTime]" class="form-control">
                <input type="time" name="availability[${dayAvailability.querySelector('select').value}][timeSlots][endTime]" class="form-control">
                <input type="checkbox" name="availability[${dayAvailability.querySelector('select').value}][timeSlots][available]"> Available
                <button type="button" class="btn btn-danger remove-time-slot">Remove</button>
            `;

            // Add to the DOM
            dayAvailability.querySelector('.timeSlots').appendChild(timeSlotDiv);

            // Re-attach remove event
            timeSlotDiv.querySelector('.remove-time-slot').addEventListener('click', removeTimeSlot);
        });
    });

    // Remove Time Slot
    function removeTimeSlot() {
        const timeSlotDiv = this.closest('.time-slot');
        timeSlotDiv.remove();
    }

    // Re-attach remove event to existing time slots
    removeTimeSlotButtons.forEach(button => {
        button.addEventListener('click', removeTimeSlot);
    });
});


document.getElementById('add-timeslot').addEventListener('click', function() {
    const container = document.getElementById('timeslot-container');
    const index = container.querySelectorAll('.timeslot-entry').length;
    const newEntry = document.createElement('div');
    newEntry.classList.add('timeslot-entry');
    newEntry.setAttribute('data-index', index);
    
    newEntry.innerHTML = `
        <div class="mb-3">
            <label for="day" class="form-label">Day</label>
            <select class="form-select day-select" name="day">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="start-time" class="form-label">Start Time</label>
            <input type="time" class="form-control" name="startTime">
        </div>

        <div class="mb-3">
            <label for="end-time" class="form-label">End Time</label>
            <input type="time" class="form-control" name="endTime">
        </div>
    `;
    
    container.appendChild(newEntry);
});