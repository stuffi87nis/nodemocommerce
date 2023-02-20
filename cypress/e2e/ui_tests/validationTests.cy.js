
describe("Test the validation for the registration fields", () => {

    before("visit url", () => {
        cy.navigation()
    })

    it("1.validation test for the registration page", () => {
        cy.validationTest()
    })
    
})