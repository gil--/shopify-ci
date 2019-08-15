/// <reference types="Cypress" />

describe('Shopify Login', () => {
    before(() => {
        cy.lockscreen()
        cy.visit('/account/login')
    })

    it('should have H1 of Login', () => {
        cy.get('h1').should('contain', 'Login')
    })

    // it('should require email', () => {
    //     cy.get('#customer_login [type="password"]').type(`${Cypress.config().testAccountPassword}{enter}`)

    //     cy.get('#customer_login [type="email"]').should('have.class', 'input--error')
    //     cy.get('.form-message').should('have.class', 'form-message--error')
    // })

    // it('should require password', () => {
    //     cy.get('#customer_login [type="email"]').clear().type(Cypress.config().testAccountEmail)
    //     cy.get('#customer_login [type="password"]').clear().type(`{enter}`)

    //     cy.get('#customer_login [type="password"]').should('have.class', 'input--error')
    //     cy.get('.form-message').should('have.class', 'form-message--error')
    // })

    it('should have link to create account', () => {
        cy.get('#customer_login a').should('have.attr', 'href').and('include', '/account/register')
    })

    it('should have link to recover password', () => {
        cy.get('.Form__ItemHelp').should('contain', 'Forgot password?')
    })

    it('should show reset password form', () => {
        cy.get('.Form__ItemHelp').click()
        cy.get('#recover_customer_password').should('be.visible')
        cy.get('#recover_customer_password .Form__Title ').should('contain', 'Recover password')
    })

    it('should hide reset password form', () => {
        cy.get('#recover_customer_password .Form__Hint button').click()
        cy.get('#recover_customer_password').should('not.be.visible')
    })

    it('should login test user', () => {
        cy.get('#customer_login [type="email"]').clear().type(Cypress.config().testAccountEmail)
        cy.get('#customer_login [type="password"]').clear().type(`${Cypress.config().testAccountPassword}{enter}`)

        cy.url().should('include', '/account')
    })

    it('should logout test user', () => {
        cy.get('a.PageHeader__Back').click()

        cy.url().should('include', '/')
    })
})
