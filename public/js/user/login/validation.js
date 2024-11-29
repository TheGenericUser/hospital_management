function ValidateLoginForm() {
	RemoveAllErrorMessage();

	var LoginEmail = document.getElementById('LoginEmail').value;
	var LoginPassword = document.getElementById('LoginPassword').value;
	var PasswordValidationMessage;
	var	emailValidationMessage;

	emailValidationMessage = isValidEmail(LoginEmail);
	if(emailValidationMessage != "valid"){
		ShowErrorMessage('LoginEmail',emailValidationMessage);
		return false;
	}
	
	PasswordValidationMessage = isValidPassword(LoginPassword);
	if(PasswordValidationMessage != "valid"){
		ShowErrorMessage('LoginPassword',PasswordValidationMessage);
		return false;
	}

    const formData = {
        email: LoginEmail,
        password: LoginPassword,
    };

    fetch(`${window.location.origin}/api/login`, {
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
		window.location.href = '/home';
    })
    .catch((error) => {
        console.error('Error:', error);
    });

	return false;
}

function ValidateRegistrationForm(){

	RemoveAllErrorMessage();

	var RegiName = document.getElementById('RegiName').value;
	var RegiEmailAddres = document.getElementById('RegiEmailAddres').value;
	var RegiPassword = document.getElementById('RegiPassword').value;
	var RegiConfirmPassword = document.getElementById('RegiConfirmPassword').value;

	var PasswordValidationMessage;
	var ConfirmPasswordMessage;
	var	emailValidationMessage;

	if(RegiName == ""){
		ShowErrorMessage('RegiName',"Please fill the filed.");
		return false;
	}else if(RegiName.length < 3 || RegiName.length > 20){
		ShowErrorMessage('RegiName',"Name should be minimum 3 and maximum 20 characters long.");
		return false;
	}

	emailValidationMessage = isValidEmail(RegiEmailAddres);

	if(emailValidationMessage != "valid"){
		ShowErrorMessage('RegiEmailAddres',emailValidationMessage);
		return false;
	}
	
	PasswordValidationMessage = isValidPassword(RegiPassword);
	if(PasswordValidationMessage != "valid"){
		ShowErrorMessage('RegiPassword',PasswordValidationMessage);
		return false;
	}
	
	ConfirmPasswordMessage = isValidPassword(RegiConfirmPassword);
	if(ConfirmPasswordMessage != "valid"){
		ShowErrorMessage('RegiConfirmPassword',ConfirmPasswordMessage);
		return false;
	}

	if(RegiPassword != RegiConfirmPassword){
		ShowErrorMessage('RegiConfirmPassword',"Password not match.");
		return false;
	}
	
    const formData = {
        name: RegiName,
        email: RegiEmailAddres,
        password: RegiPassword,    
	};

    fetch(`${window.location.origin}/api/signup`, {
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
        if(data.success) SendVerificationCode();
		return true;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function ValidateForgotPasswordForm(){

	RemoveAllErrorMessage();

	var forgotPassEmail = document.getElementById('forgotPassEmail').value;
	
	var	emailValidationMessage;
	emailValidationMessage = isValidEmail(forgotPassEmail);

	if(emailValidationMessage != "valid"){
		ShowErrorMessage('forgotPassEmail',emailValidationMessage);
		return false;
	}
}



function ValidateResetPasswordForm(){

	RemoveAllErrorMessage();

	var NewPassword = document.getElementById('NewPassword').value;
	var ConfirmNewPassword = document.getElementById('ConfirmNewPassword').value;

	var PasswordValidationMessage;
	var ConfirmPasswordMessage;
	
	PasswordValidationMessage = isValidPassword(NewPassword);
	if(PasswordValidationMessage != "valid"){
		ShowErrorMessage('NewPassword',PasswordValidationMessage);
		return false;
	}
	
	ConfirmPasswordMessage = isValidPassword(ConfirmNewPassword);
	if(ConfirmPasswordMessage != "valid"){
		ShowErrorMessage('ConfirmNewPassword',ConfirmPasswordMessage);
		return false;
	}

	if(NewPassword != ConfirmNewPassword){
		ShowErrorMessage('ConfirmNewPassword',"Password not match.");
		return false;
	}

	return true;
}

function RemoveAllErrorMessage(){

	var allErrorMessage = document.getElementsByClassName('error-message');
	var allErrorFiled = document.getElementsByClassName('error-input');
	var i;

	for(i=(allErrorMessage.length - 1); i>=0; i--){
		allErrorMessage[i].remove();
	}
	
	for(i=(allErrorFiled.length-1);i>=0;i--){
		allErrorFiled[i].classList.remove('error-input');
	}
}

function ShowErrorMessage(InputBoxID,Message){

	var InputBox = document.getElementById(InputBoxID);
	InputBox.classList.add('error-input');
	InputBox.focus();

	var ErrorMessageElement = document.createElement("p");
	ErrorMessageElement.innerHTML = Message;
	ErrorMessageElement.classList.add('error-message');
	ErrorMessageElement.setAttribute("id",InputBoxID+'-error');

	InputBox.parentNode.insertBefore(ErrorMessageElement, InputBox.nextSibling);
	
}

function isValidEmail(email){
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(email == ""){
		return "Please fill the field.";
	}

	if(emailRegex.test(email) == false){
		return "This is not a valid email.";
	}

	return "valid";
}

function isValidPassword(password) {	
	const minLength = 10;

	if(password == ""){
		return "Please fill the field."
	}

	if (password.length < minLength) {
		return "Password length should be minimum 10 characters.";
	}

	return "valid";
}