const urlParams = new URLSearchParams(window.location.search);
document.getElementById(`user-modify-form`).addEventListener('submit', function (e) {
    e.preventDefault();


    const userId = urlParams.get('id');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    const userData = {
        id: userId,
        name: name,
        email: email,
        password: password,
        role: role,
        age: age,
        gender: gender,
    };

    fetch('/api/updateUsers', {
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