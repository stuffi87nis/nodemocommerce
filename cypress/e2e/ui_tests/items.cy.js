

before("visit url", () => {
    cy.navigation()
    cy.login()
})

it("1.sorting items", () => {
    cy.get('[href="/computers"]').realHover()
    cy.get('[href="/desktops"]').realClick()

    cy.get('#products-orderby').select('5').then(() => {
        expect(['Build your own computer', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Lenovo IdeaCentre 600 All-in-One PC'])
        .to.have.ordered.members(['Build your own computer', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Lenovo IdeaCentre 600 All-in-One PC'])
    })

    cy.get('#products-orderby').select('6').then(() => {
        expect(['Lenovo IdeaCentre 600 All-in-One PC', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Build your own computer'])
        .to.have.ordered.members(['Lenovo IdeaCentre 600 All-in-One PC', 'Digital Storm VANQUISH 3 Custom Performance PC', 'Build your own computer'])
    })

    cy.get('#products-orderby').select('10').then(() => {
        expect(['$ 500.00', '$1,200.00', '$1,259.00'])
        .to.have.ordered.members(['$ 500.00', '$1,200.00', '$1,259.00'])
    })

    cy.get('#products-orderby').select('11').then(() => {
        expect(['$1,259.00', '$1,200.00', '$500.00'])
        .to.have.ordered.members(['$1,259.00', '$1,200.00', '$500.00'])
    })
})

it("2.number of items on display test", () => {
    cy.visit('https://demo.nopcommerce.com/notebooks')

    cy.get('#products-pagesize').select('3')
    cy.get('.product-item').should('have.length', '3')

    cy.get('#products-pagesize').select('6')
    cy.get('.product-item').should('have.length', '3')
})