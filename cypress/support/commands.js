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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('getDescricao', () => {
    cy.get('#tab-title-description').should('contain', 'Descrição');
})
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('getInforrmacaoAdicional', () => {
    cy.get('#tab-title-additional_information > a').should('contain', 'Informação adicional');
})

Cypress.Commands.add('getAvaliacoes', () => {
    cy.get('#tab-title-reviews > a')
})

Cypress.Commands.add('selecionarAtributosDoProduto', () => {
    cy.get('.button-variable-item-M').click();
    cy.get('.button-variable-item-Red').click();
})

Cypress.Commands.add('adicionarAoCarrinho', () => {
    cy.get('.single_add_to_cart_button').click();
});

Cypress.Commands.add('clicarEmVerCarrinho', () => {
    cy.get('.woocommerce-message > .button').click();
});

Cypress.Commands.add('clicarEmConcluirCompra', () => {
    cy.get('.checkout-button').click();
});

Cypress.Commands.add('enviarFormulario', () => {
    cy.get('form[name="checkout"]').submit()
});



