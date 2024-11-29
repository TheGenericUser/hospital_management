const reportInput = document.getElementById('report-upload-input');



document.querySelector('.container').addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('delete-report-btn')) {
        const reportElement = event.target.closest('.lab-reports');
        if (reportElement) {
            reportElement.remove();
        }
    }
});

reportInput.addEventListener('change', function (event) {
    const files = event.target.files;
    if (files.length > 0) {
        showUploadedReports(files);
    }
});

// Function to show the selected uploaded reports
function showUploadedReports(files) {
    // Show the upload status message
    document.getElementById('upload-status').innerHTML = 'Reports selected:';

    let uploadedLinks = '';
    for (let i = 0; i < files.length; i++) {
        // Create a link for each uploaded file (assuming files are PDFs)
        uploadedLinks += `
            <div class="d-flex justify-content-between align-items-center lab-reports">
                <a href="#" class="btn btn-link" target="_blank">${files[i].name}</a>
                <button type="button" class="btn btn-outline-danger faa-xmark mt-1 delete-report-btn">
                    <i class="fa-solid fa-xmark"></i> Delete
                </button>
            </div>
        `;
    }
    document.getElementById('upload-status').innerHTML += `<br>${uploadedLinks}`;
}