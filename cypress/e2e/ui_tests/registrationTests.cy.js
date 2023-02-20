

describe("Registration test", () => {

    before("visit url", () => {
        cy.navigation()
    })
    
    it('1.Sucessfull registration test', () => {
        cy.registrationTest()
    })
})