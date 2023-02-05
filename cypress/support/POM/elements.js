export {registrationElements, messageElements, loginElements, itemElements, itemDetailElements}

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

const itemElements = {
    computerHref : '[href="/computers"]',
    desktopHref : '[href="/desktops"]',
    elementForSortingItems : '#products-orderby',
    elementForVisualDisplay : '#products-pagesize',
    productItem : '.product-item'
}

const itemDetailElements = {
    processorId : '#product_attribute_1',
    ramId : '#product_attribute_2',
    hddId : '#product_attribute_3_6',
    osId1 : '#product_attribute_4_8',
    osId2 : '#product_attribute_4_9',
    softwareId1 : '#product_attribute_5_10',
    softwareId2 : '#product_attribute_5_11',
    softwareId3 : '#product_attribute_5_12',
    itemQuantity : '#product_enteredQuantity_1',
    addTocart : '#add-to-cart-button-1'
}