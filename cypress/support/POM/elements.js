export {registrationElements, messageElements, loginElements}

const registrationElements = {
    registrationLink : ".ico-register",
    femaleButton :  '#gender-female',
    maleButton :   '#gender-male',
    finishRegistration : '#register-button',
    email : '#Email',
    password : '#Password',
    confirmPassword : '#ConfirmPassword',
    firstName : '#FirstName',
    lastName :  '#LastName',
    dateOfBirthDay : '[name="DateOfBirthDay"]',
    dateOfBirthMonth : '[name="DateOfBirthMonth"]',
    dateOfBirthYear : '[name="DateOfBirthYear"]',
    company : '#Company',
    newsLetterButton : '#Newsletter',
    continueRegistration :  '.register-continue-button'
}

const messageElements = {
    firstNameError : '#FirstName-error',
    lastNameError : '#LastName-error',
    emailError : '#Email-error',
    passwordError : '#Password-error',
    confirmPasswordError : '#ConfirmPassword-error',
    successfulRegistration : '.result'
}

const loginElements = {
    loginLink : '.ico-login',
    loginButton : '.login-button'
}