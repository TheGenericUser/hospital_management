const urlParams = new URLSearchParams(window.location.search);
document.getElementById(`update-walkin-consultation-form`).addEventListener('submit', function (e) {
    e.preventDefault();

    const consultationId = urlParams.get('id');
    const status = document.getElementById('status').value;

    const consultationData = {
        id: consultationId,
        status: status,
    };

    fetch(`/api/updateConsultation`, {
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