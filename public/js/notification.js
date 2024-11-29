function showNotification(text, duration) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');

    // Set the notification text
    notificationText.textContent = text;

    // Show the notification immediately
    notification.classList.add('active');

    // Hide the notification after the specified duration
    setTimeout(() => {
        closeNotification();
    }, duration);
}

// Function to close the notification manually
function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('active');
}

// Function to close the notification manually
function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('active');
}