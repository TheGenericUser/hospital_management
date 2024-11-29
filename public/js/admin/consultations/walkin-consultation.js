const urlParams = new URLSearchParams(window.location.search);

document.body.addEventListener('submit', function (e) {
    // Check if the event target matches the form ID
    if (e.target && e.target.id === 'walkin-consultation-form') {
        e.preventDefault();
        const doctorId = document.getElementById('doctor').value;
        const consultationDate = document.getElementById('consultation-date').value;
        const consultationTime = document.getElementById('consultation-time').value;
        const patientId = urlParams.get('id');

        const consultationData = {
            id: doctorId,
            patientId: patientId,
            consultationDate: consultationDate,
            consultationTime: consultationTime,
        };
    
        fetch('/api/addWalkinConsultation', {
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
    }
});