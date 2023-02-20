


describe("Single item test", () => {

    before("visit url", () => {
        cy.navigation()
        cy.login()
    })


    it("test for the single item", () => {
       cy.testTheComputerComponents()
    })

    
    it("comapre the quantity", () => {
        cy.compareQuantityTest()
     })
})