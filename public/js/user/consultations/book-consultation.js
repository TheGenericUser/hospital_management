document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('book-consultation-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const ageField = document.getElementById('user-age');
            const genderField = document.getElementById('user-gender');
        
            let age, gender;
            if (ageField && ageField.value) {
                age = ageField.value;
            }
        
            if (genderField && genderField.value) {
                gender = genderField.value; // Set gender if the field is present and has a value
            }
        
            const consultationDate = document.getElementById('consultation-date').value;
            const consultationTime = document.getElementById('consultation-time').value;
            const doctorId = window.location.href.split('/')[4];
        
            const consultationData = {
                doctorId: doctorId,
                consultationDate: consultationDate,
                consultationTime: consultationTime,
                ...(age && { age: age }),
                ...(gender && { gender: gender })
            };
        
            fetch('/api/book-consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(consultationData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        console.log(data.message);
                    }
                    console.log(data.message);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
});