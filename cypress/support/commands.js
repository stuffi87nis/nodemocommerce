// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//POM
import {
    registrationElements, 
    messageElements, 
    loginElements
} from "../support/POM/elements"

//DOM
import {
    userInfoData, 
    messagesData
} from "../fixtures/DOM/registrationData"


Cypress.Commands.add("navigation", () => {
    cy.visit(Cypress.env('baseUrl'))
})

Cypress.Commands.add("login", () => {
    cy.get(loginElements.loginLink).click()
   
    cy.get(registrationElements.email).type(userInfoData.emailData)
    cy.get(registrationElements.password).type(userInfoData.passwordData)
    cy.get(loginElements.loginButton).click()
})

Cypress.Commands.add("registrationTest", () => {
    cy.visit('https://demo.nopcommerce.com/register?returnUrl=%2F')

    cy.get(registrationElements.maleButton).click()

    cy.get(registrationElements.firstName).type(userInfoData.firstNameData)
    cy.get(registrationElements.lastName).type(userInfoData.lastNameData)

    cy.get(registrationElements.dateOfBirthDay).select(userInfoData.dayData)
    cy.get(registrationElements.dateOfBirthMonth).select(userInfoData.monthData)
    cy.get(registrationElements.dateOfBirthYear).select(userInfoData.yearData)

    cy.get(registrationElements.email).clear().type(userInfoData.emailData)

    cy.get(registrationElements.company).type(userInfoData.companyData)
    cy.get(registrationElements.newsLetterButton).uncheck()
    cy.get(registrationElements.newsLetterButton).check()

    cy.get(registrationElements.password).clear().type(userInfoData.passwordData)
    cy.get(registrationElements.confirmPassword).clear().type(userInfoData.repeartPasswordData)

    cy.get(registrationElements.finishRegistration).click()

    cy.get(messageElements.successfulRegistration).should('have.text', messagesData.registrationIsFinished)
    cy.get(registrationElements.continueRegistration).click()
})