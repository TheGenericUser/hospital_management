function ShowLoginForm() {
    document.getElementById('LoginFrom').style.display = 'block';
    document.getElementById('RegistrationFrom').style.display = 'none';
    document.getElementById('ForgotPasswordForm').style.display = 'none';
    document.getElementById('ResetPasswordForm').style.display = 'none';
    document.getElementById('VerificationForm').style.display = 'none';
    document.getElementById('forgetPassword').style.display = 'none';
    document.getElementById('ShowLoginBtn').classList.add('active');
    document.getElementById('ShowRegistrationBtn').classList.remove('active');
    document.getElementById('formTitle').innerText = 'Login';
}

function ShowRegistrationForm() {
    document.getElementById('LoginFrom').style.display = 'none';
    document.getElementById('RegistrationFrom').style.display = 'block';
    document.getElementById('ForgotPasswordForm').style.display = 'none';
    document.getElementById('ResetPasswordForm').style.display = 'none';
    document.getElementById('VerificationForm').style.display = 'none';
    document.getElementById('forgetPassword').style.display = 'none';    
    document.getElementById('ShowLoginBtn').classList.remove('active');
    document.getElementById('ShowRegistrationBtn').classList.add('active');
    document.getElementById('formTitle').innerText = 'Registration';
}


 


function ShowForgotPasswordForm() {
    document.getElementById('LoginFrom').style.display = 'none';
    document.getElementById('RegistrationFrom').style.display = 'none';
    document.getElementById('ForgotPasswordForm').style.display = 'block';
    document.getElementById('ResetPasswordForm').style.display = 'none';
    document.getElementById('VerificationForm').style.display = 'none';
    document.getElementById('forgetPassword').style.display = 'none';
    document.getElementById('formTitle').innerText = 'Forgot Password';
}

// New Function to handle sending reset password code
function SendResetPasswordCode() {
    const email = document.getElementById('forgotPassEmail').value;
    if (email) {
        const formData = {
            email: email,
        };
    
        fetch(`${window.location.origin}/api/forgetpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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
        document.getElementById('ForgotPasswordForm').style.display = 'none';
        document.getElementById('ResetPasswordForm').style.display = 'none';
        document.getElementById('forgetPassword').style.display = 'block';

    } else {
        alert("Please enter your email.");
    }
}

// Function to verify the code for resetting the password
function VerifyCode() {
    var enteredCode = document.getElementById('verificationCode').value;
    if (enteredCode === "123456") {  // This would be compared with the real sent code
        alert("Verification successful! Please reset your password.");
        document.getElementById('forgetPassword').style.display = 'none';
        document.getElementById('ResetPasswordForm').style.display = 'block';
    } else {
        alert("Invalid verification code.");
    }
}

// Function to reset the password
function ResetPassword() {
    const newPassword = document.getElementById('NewPassword').value;
    const confirmPassword = document.getElementById('ConfirmNewPassword').value;
    if (newPassword === confirmPassword) {
    
        const formData = {
            new_password: newPassword,
        };
    
        fetch(`${window.location.origin}/api/changepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            showNotification(data.message, 1000*10);
            document.getElementById('ResetPasswordForm').style.display = 'none';
            ShowLoginForm()
        })
        .catch((error) => {
            console.error('Error:', error);
        });        
        ShowLoginForm();
    }
}
function ShowLoginForm() {
    document.getElementById('LoginFrom').style.display = 'block';
    document.getElementById('RegistrationFrom').style.display = 'none';
    document.getElementById('VerificationForm').style.display = 'none';
    document.getElementById('forgetPassword').style.display = 'none';
    document.getElementById('ForgotPasswordForm').style.display = 'none';
    document.getElementById('ResetPasswordForm').style.display = 'none';
    document.getElementById('ShowLoginBtn').classList.add('active');
    document.getElementById('ShowRegistrationBtn').classList.remove('active');
    document.getElementById('formTitle').innerText = 'Login';
}

function ShowRegistrationForm() {
    document.getElementById('LoginFrom').style.display = 'none';
    document.getElementById('RegistrationFrom').style.display = 'block';
    document.getElementById('VerificationForm').style.display = 'none';
    document.getElementById('forgetPassword').style.display = 'none';
    document.getElementById('ForgotPasswordForm').style.display = 'none';
    document.getElementById('ResetPasswordForm').style.display = 'none';
    document.getElementById('ShowLoginBtn').classList.remove('active');
    document.getElementById('ShowRegistrationBtn').classList.add('active');
    document.getElementById('formTitle').innerText = 'Registration';
}

function SendVerificationCode() {
    document.getElementById('RegistrationFrom').style.display = 'none';
    document.getElementById('VerificationForm').style.display = 'block';
}

// Function to verify the entered code
function VerifyCodeEmail() {
    const enteredCode = document.getElementById('verificationCode').value;
    // Simulate verification process
    const formData = {
        code: parseInt(enteredCode),
    };

    fetch(`${window.location.origin}/api/verificationcode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        showNotification(data.message, 1000*10);
        document.getElementById('VerificationForm').style.display = 'none';
        ShowLoginForm();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function VerifyCodePassword() {
    const enteredCode = document.getElementById('passwordCode').value;
    const formData = {
        recoveryCode: parseInt(enteredCode),
    };

    fetch(`${window.location.origin}/api/accountrecoverycode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        showNotification(data.message, 1000*10);
        document.getElementById('forgetPassword').style.display = 'none';
        document.getElementById('ResetPasswordForm').style.display = 'block';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

