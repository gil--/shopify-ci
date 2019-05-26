/// <reference types="Cypress" />

describe('Theme Header', () => {
    before(() => {
        cy.lockscreen()
        cy.visit('/')
    })

    it('should have logo linking to homepage', () => {
        cy.get('.site-header__logo a').should('have.attr', 'href').and('include', '/')
    })

    it('should have account link', () => {
        cy.get('.site-header__account').should('be.visible').and('have.attr', 'href').and('include', '/account/login')
    })

    it('should have search button', () => {
        cy.get('.site-header__search-toggle').should('be.visible').and('contain', 'Search')
    })

    it('should have bag button', () => {
        cy.get('.site-header__cart').should('be.visible').and('have.attr', 'href').and('include', '/cart')
    })

    it('should not have mobile menu button', () => {
        cy.get('.site-header__menu').should('not.be.visible')
    })

    it('should have main menu', () => {
        cy.get('#AccessibleNav').should('be.visible')
    })

    // 
    // Mobile
    //
    it('should have mobile menu button', () => {
        cy.viewport('iphone-6+')
        cy.get('.site-header__menu').should('be.visible').and('have.class', 'mobile-nav--open')
    })

    it('should not have main menu', () => {
        cy.viewport('iphone-6+')
        cy.get('#AccessibleNav').should('not.be.visible')
    })
})