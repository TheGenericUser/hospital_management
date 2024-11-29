const deleteButton = document.getElementById('deleteButton');

deleteButton.addEventListener('click', function() {
    openModal('confirmDeleteModal');

    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    cancelDeleteBtn.onclick = cancelDelete;
    confirmDeleteBtn.onclick = confirmDelete;

    function cancelDelete() {
        closeModal('confirmDeleteModal');
    }

    function confirmDelete() {
        cancelDeleteBtn.onclick = null;
        confirmDeleteBtn.onclick = null;

        const userId = urlParams.get('id');

        let userData;
        userData = {
            id: userId,
        };

        closeModal('confirmDeleteModal');
        fetch('/api/deleteUsers', {
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
    }
});
