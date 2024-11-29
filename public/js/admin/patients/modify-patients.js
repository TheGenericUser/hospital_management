const path = window.location.href.split('/');
const title = path[path.length - 1].replace('update', '').split('?')[0];
const urlParams = new URLSearchParams(window.location.search);
document.getElementById(`patient-modify-form`).addEventListener('submit', function (e) {
    e.preventDefault();

    const patientId = urlParams.get('id');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    const report = document.getElementById('report-upload-input').files;

    const reportLinks = document.querySelectorAll('.lab-reports .btn.btn-link');

    const hrefs = [];

    reportLinks.forEach(link => {
        let href = link.getAttribute('href');
        if (href !== '#') hrefs.push(href);
    });
    
    let labReportId = null;
    let reportNumbers = [];
    
    if (hrefs.length > 0) {
        labReportId = new URL(reportLinks[0].href).pathname.split('/').filter(Boolean)[1]; // Get the labReportId from the first link

        reportNumbers = Array.from(reportLinks).map(link => {
            const url = new URL(link.href);  // Create a URL object from the href
            if(url.search === ''){
                const parts = url.pathname.split('/').filter(Boolean);  // Split the path and remove empty segments
                return parts[parts.length - 1];  // Get the last part of the URL (the report number)
            }
        });

    }

    if (hrefs.length === 0 || !labReportId) {
        labReportId = null;
        reportNumbers = null;
    }

    const patientData = new FormData();
    patientData.append('id', patientId);
    patientData.append('name', name);
    patientData.append('email', email);
    patientData.append('age', age);
    patientData.append('gender', gender);
    patientData.append('labReportId', labReportId);
    patientData.append('reportNumbers', reportNumbers);

    for (let i = 0; i < report.length; i++) {
        patientData.append('report', report[i]);
    }

    fetch(`/api/update${title}`, {
        method: 'POST',
        body: patientData
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