//POM
import {
    registrationElements,
    messageElements
} from "../../support/POM/elements"

//DOM
import {
    messagesData,
    userInfoData
} from "../../fixtures/DOM/registrationData"



before("visit url", () => {
    cy.navigation()
})

it("1.validation test for the registration page", () => {
    cy.get(registrationElements.registrationLink).click()

    cy.get(registrationElements.femaleButton).check().should('be.checked')
    if(cy.get(registrationElements.femaleButton).check()){
        cy.get(registrationElements.maleButton).should('not.be.checked')
    }

    cy.get(registrationElements.maleButton).check().should('be.checked')
    if(cy.get(registrationElements.maleButton).check()){
        cy.get(registrationElements.femaleButton).should('not.be.checked')
    }

    cy.get(registrationElements.finishRegistration).click()

    cy.get(messageElements.firstNameError).should('have.text', messagesData.firstNameErrorMessage)
    cy.get(messageElements.lastNameError).should('have.text', messagesData.lastNameErrorMessage)
    cy.get(messageElements.emailError).should('have.text', messagesData.emailErrorMessage)
    cy.get(messageElements.passwordError).should('have.text', messagesData.passwordErrorMessage)

    cy.get(registrationElements.email).type(userInfoData.wrongEmailData)
    cy.get(messageElements.emailError).should('have.text', messagesData.wrongEmailMessage)

    if(cy.get(registrationElements.password).type("232s")){
        cy.get(messageElements.passwordError).children().find('li').should('have.text', messagesData.shortPasswordMessage)
    }

    cy.get(registrationElements.confirmPassword).type("stefan123")

    let password = "232s"
    let repeatPassword = "stefan123"

    if(password !== repeatPassword){
        cy.get(messageElements.confirmPasswordError).should('have.text', messagesData.notMachPasswordMessage)
    }
})

it('2.Sucessfull registration test', () => {
    cy.registrationTest()
})