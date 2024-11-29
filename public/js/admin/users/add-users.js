document.getElementById('userForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    const userData = {
        name: name,
        email: email,
        password: password,
        role: role,
        age: age,
        gender: gender,
    };
    closeModal('userModal');

    fetch('/api/addUsers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
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