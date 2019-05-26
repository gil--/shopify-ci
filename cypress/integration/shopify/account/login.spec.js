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

    it('should require password', () => {
        cy.get('#customer_login [type="email"]').type(Cypress.config().testAccountEmail)
        cy.get('#customer_login [type="password"]').type(`{enter}`)

        cy.get('#customer_login [type="password"]').should('have.class', 'input--error')
        cy.get('.form-message').should('have.class', 'form-message--error')
    })

    it('should login test user', () => {
        cy.get('#customer_login [type="email"]').type(Cypress.config().testAccountEmail)
        cy.get('#customer_login [type="password"]').type(`${Cypress.config().testAccountPassword}{enter}`)

        cy.url().should('include', '/account')
    })

    it('should have link to create account', () => {
        cy.get('#customer_register_link').should('have.attr', 'href').and('include', '/account/register')
    })

    it('should have link to recover password', () => {
        cy.get('#RecoverPassword').should('have.attr', 'href').and('include', '#recover')
    })

    it('should show reset password form', () => {
        cy.get('#RecoverPassword').click()
        cy.get('#RecoverPasswordForm').should('be.visible')
        cy.get('#RecoverHeading ').should('contain', 'Reset your password')
    })
})
