// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add('lockscreen', (password) => {
    const lockscreenPassword = password || Cypress.config().storePassword;

    if (Cypress.config().isStorePasswordEnabled) {
        cy.request({
            method: 'POST',
            url: '/password',
            body: {
                password: lockscreenPassword,
            }
        })
    }

})

Cypress.Commands.add('login', (email, password) => {
    const accountEmail = email || Cypress.config().testAccountEmail;
    const accountPassword = password || Cypress.config().testAccountPassword;

    // currently moves us to /challenge Captcha "robot"
    // cy.request({
    //     method: 'POST',
    //     url: '/account/login',
    //     body: {
    //         email: accountEmail,
    //         password: accountPassword,
    //         form_type: "customer_login",
    //         utf8: "✓",
    //     }
    // })
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
