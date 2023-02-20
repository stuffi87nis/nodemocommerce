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
    loginElements,
    itemElements,
    itemDetailElements
} from "../support/POM/elements"

//DOM
import {
    userInfoData, 
    messagesData,
} from "../fixtures/DOM/registrationData"

import {
    itemsData
} from "../fixtures/DOM/items"


Cypress.Commands.add("navigation", () => {
    cy.visit(Cypress.env('baseUrl'))
})

Cypress.Commands.add("login", () => {
    cy.get(loginElements.loginLink).click()
   
    cy.get(registrationElements.email).type(userInfoData.emailData)
    cy.get(registrationElements.password).type(userInfoData.passwordData)
    cy.get(loginElements.loginButton).click()
})


Cypress.Commands.add('validationTest', () => {

    cy.intercept('GET', '/register?returnUrl=%2F').as('reg')
       
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
        
        cy.wait('@reg')
})

Cypress.Commands.add("registrationTest", () => {

    cy.intercept('https://demo.nopcommerce.com/register?returnUrl=%2F').as('regUrl')

    cy.get(registrationElements.registrationLink).click()

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
    cy.wait('@regUrl')
    
    cy.intercept('/registerresult/1?returnUrl=/').as('conReg')

    cy.get(registrationElements.finishRegistration).click()
    
    cy.wait('@conReg')
    
    cy.get(messageElements.successfulRegistration).should('have.text', messagesData.registrationIsFinished)

    cy.get(registrationElements.continueRegistration).click()    

   
    
})

Cypress.Commands.add("testTheItemSorging", () => {
    cy.get(itemElements.computerHref).realHover()
    cy.get(itemElements.desktopHref).realClick()

    cy.get(itemElements.elementForSortingItems).select('5').then(() => {
        expect([itemsData.buildComputer, itemsData.customPerfomancePC, itemsData.lenovo600])
        .to.have.ordered.members([itemsData.buildComputer, itemsData.customPerfomancePC, itemsData.lenovo600])
    })

    cy.get(itemElements.elementForSortingItems).select('6').then(() => {
        expect([itemsData.lenovo600, itemsData.customPerfomancePC, itemsData.buildComputer])
        .to.have.ordered.members([itemsData.lenovo600, itemsData.customPerfomancePC, itemsData.buildComputer])
    })

    cy.get(itemElements.elementForSortingItems).select('10').then(() => {
        expect(['$500.00', '$1,200.00', '$1,259.00'])
        .to.have.ordered.members(['$500.00', '$1,200.00', '$1,259.00'])
    })

    cy.get(itemElements.elementForSortingItems).select('11').then(() => {
        expect(['$1,259.00', '$1,200.00', '$500.00'])
        .to.have.ordered.members(['$1,259.00', '$1,200.00', '$500.00'])
    })
})

Cypress.Commands.add("diplayItemsTest", () => {
    cy.visit('https://demo.nopcommerce.com/notebooks')

    cy.get(itemElements.elementForVisualDisplay).select('3')
    cy.get(itemElements.productItem).should('have.length', '3')

    cy.get(itemElements.elementForVisualDisplay).select('6')
    cy.get(itemElements.productItem).should('have.length', '6')
})

Cypress.Commands.add("testTheComputerComponents", () => {

    cy.intercept('POST', '/addproducttocart/details/1/1').as('finishOrder')
    cy.visit('https://demo.nopcommerce.com/build-your-own-computer')

    cy.get('#product_attribute_1').realClick()
    cy.get(itemDetailElements.processorId).select('1')
    cy.get(itemDetailElements.processorId).select('0')
    cy.get(itemDetailElements.processorId).select('2')

    cy.get(itemDetailElements.ramId).select('3')
    cy.get(itemDetailElements.ramId).select('4')
    cy.get(itemDetailElements.ramId).select('5')

    cy.get(itemDetailElements.hddId).check()
    cy.get(itemDetailElements.hddId).check()

    cy.get(itemDetailElements.osId1).check()
    cy.get(itemDetailElements.osId2).check()

    cy.get(itemDetailElements.softwareId1).check()
    cy.get(itemDetailElements.softwareId2).check()
    cy.get(itemDetailElements.softwareId3).check()

    cy.get(itemDetailElements.itemQuantity).clear().type(4)
    cy.get(itemDetailElements.addTocart).click()

    cy.wait('@finishOrder')
    cy.get(itemDetailElements.popMessageSuccess).should('be.visible').should('have.text', itemsData.popUpMessageText)

    cy.get(itemDetailElements.linkInSucessMessage)
        .then((link) => {
        cy.request(link.prop('href'))
    })

})

Cypress.Commands.add('compareQuantityTest', () => {
    cy.visit('https://demo.nopcommerce.com/build-your-own-computer')

    cy.wait(4000)
    cy.contains('#topcartlink', 'Shopping cart (0)')
    cy.get('select#product_attribute_2').select(3)
    cy.get('input#product_attribute_3_6').check()
    cy.get('[aria-label="Enter a quantity"]').clear().type(5)
    cy.contains('button', 'Add to cart').click()
    cy.contains('#topcartlink', 'Shopping cart (5)')
})