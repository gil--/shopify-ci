/// <reference types="Cypress" />

describe('Shopify Account Dashboard', () => {
    beforeEach(() => {
        cy.lockscreen()
        cy.login()
        cy.visit('/account');
    })

    it('contains Login title', () => {
        cy.get('h1').should('contain', 'My Account')
    })
})
