document.getElementById('patientForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    const patientData = {
        name: name,
        email: email,
        age: age,
        gender: gender,
    };

    closeModal('patientModal');

    fetch(`/api/addWalkinPatients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
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