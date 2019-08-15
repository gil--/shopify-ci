/// <reference types="Cypress" />

describe('Shopify Lockscreen', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.Password__LockAction span').click();
    })

    it('should correctly forward to homepage', () => {
        cy.get('[type="password"]').clear().type(`${Cypress.config().storePassword}{enter}`);
        cy.url().should('not.include', '/password');
    })

    it('should correctly block', () => {
        cy.get('[type="password"]').clear().type('Password2{enter}');
        cy.url().should('include', '/password');
    })
})