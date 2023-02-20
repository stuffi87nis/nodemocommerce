


describe("Test for the list of items", () => {
    
    before("visit url", () => {
        cy.navigation()
        cy.login()
    })
    
    it.only("1.sorting items", () => {
        cy.testTheItemSorging()
    })
    
    it("2.number of items on display test", () => {
        cy.diplayItemsTest()
    })
    
    it("3.test for the custom computer", () => {
        cy.testTheComputerComponents()
    })
})
