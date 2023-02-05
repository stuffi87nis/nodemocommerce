

before("visit url", () => {
    cy.navigation()
    cy.login()
})

it("1.sorting items", () => {
    cy.testTheItemSorging()
})

it("2.number of items on display test", () => {
    cy.diplayItemsTest()
})

it.only("3.test for the custom computer", () => {
    cy.testTheComputerComponents()
})