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
    itemElements
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

Cypress.Commands.add("testTheItemSorging", () => {
    cy.get(itemElements.computerHref).realHover()
    cy.get(itemElements.desktopHref).realClick()

    cy.get(itemElements.elementForSortingItems).select('5').then(() => {
        expect(['Build your own computer', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Lenovo IdeaCentre 600 All-in-One PC'])
        .to.have.ordered.members(['Build your own computer', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Lenovo IdeaCentre 600 All-in-One PC'])
    })

    cy.get(itemElements.elementForSortingItems).select('6').then(() => {
        expect(['Lenovo IdeaCentre 600 All-in-One PC', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Build your own computer'])
        .to.have.ordered.members(['Lenovo IdeaCentre 600 All-in-One PC', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Build your own computer'])
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
    cy.visit('https://demo.nopcommerce.com/build-your-own-computer')
    cy.get('#product_attribute_1').select('1')
    cy.get('#product_attribute_1').select('0')
    cy.get('#product_attribute_1').select('2')

    cy.get('#product_attribute_2').select('3')
    cy.get('#product_attribute_2').select('4')
    cy.get('#product_attribute_2').select('5')

    cy.get('#product_attribute_3_6').check()
    cy.get('#product_attribute_3_6').check()

    cy.get('#product_attribute_4_8').check()
    cy.get('#product_attribute_4_9').check()

    cy.get('#product_attribute_5_10').check()
    cy.get('#product_attribute_5_11').check()
    cy.get('#product_attribute_5_12').check()

    let shopingCart;
    cy.get('#topcartlink').then((val) => {
        shopingCart = parseInt(val[0].innerText)
    }).then(() => {
        cy.get('#product_enteredQuantity_1').clear().type(3)
        cy.get('#add-to-cart-button-1').click()
        cy.get('#product_enteredQuantity_1').then((items) => {
            expect(items.length.Number).to.be.eq(Number(shopingCart))
        })
    })

})