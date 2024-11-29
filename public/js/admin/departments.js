document.getElementById('add-departments').addEventListener('click', function () {
    openModal('departmentModal');
});

document.getElementById('close-modal-btn').addEventListener('click', function () {
    closeModal('departmentModal');
});


document.getElementById('departmentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;

    const userData = {
        name: name,
    };

    fetch('/api/addDepartments', {
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
        if(data.success){
            console.log(data.message);
        }
        console.log(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


function modifyDepartment(icon) {
    const row = icon.closest('tr');
    
    const departmentId = row.getAttribute('data-department-id');
    const name = row.querySelector('input[type="text"]').value;

    const departmentData = {
        id: departmentId,
        name: name,
    };

    fetch('/api/updateDepartments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(departmentData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if(data.success){
            console.log(data.message);
        }
        console.log(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteDepartment(element) {
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

        const row = element.closest('tr');
    
        const deleteUserId = row.getAttribute('data-department-id');
    
        let userData;
        userData = {
            id: deleteUserId,
        };

        closeModal('confirmDeleteModal');
        fetch('/api/deleteDepartments', {
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
            if(data.success){
                console.log(data.message);
            }
            console.log(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
};