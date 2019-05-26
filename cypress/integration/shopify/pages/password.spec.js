/// <reference types="Cypress" />

describe('Shopify Lockscreen', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.js-modal-open-login-modal').contains('Enter using password').click();
    })

    // it('Shows Password Form', () => {
    //     cy.get('#LoginModal').should('be.visible');
    //     cy.get('[type="password"]').should('be.visible');
    // })

    it('should correctly forward to homepage', () => {
        cy.get('[type="password"]').type(`${Cypress.config().storePassword}{enter}`);
        cy.url().should('not.include', '/password');
    })

    it('should correctly block', () => {
        cy.get('[type="password"]').type('Password2{enter}');
        //cy.get('#login_form button[type="submit"]').contains('Enter').click();
        cy.url().should('include', '/password');
    })
})