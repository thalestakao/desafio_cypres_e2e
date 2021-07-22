
context('Compra de Produtos', () => {
    let data;
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/');
        cy.get(`[id$="-0"] > .products > .row > .post-4104 > .product-block > .block-inner > .image > .product-image`).click();
        cy.fixture('data').then( dadosUsuario => {
            data = dadosUsuario;
        })
    });
    
    
    it('Na página inicial ao selecionar um produto deve ser redirecionado para a página de detalhe do produto.', () => {
        cy.get('#tab-title-description').should('contain', 'Descrição');
        cy.get('#tab-title-additional_information > a').should('contain', 'Informação adicional');
        cy.get('#tab-title-reviews > a').should('contain', 'Avaliações');
    });

    it('Na página de compra ao selecionar ao selecionar um size e uma color o botão comprar dever estar habilitado', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').should('not.have.class', 'disabled');
    });

    it('Ao clicar em comprar o produto deve ser adicionado ao carrinho.', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho');
    });

    it('Ao clicar em ver carrinho deve ser redirecionado para a página do carrinho', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message > .button').click();
        cy.url().should('contain', '/cart');
    });

    it('Ao fazer a compra de pelo menos um produto e visualizar o carrinho não deve conter mensagem de carrinho vazio.', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message > .button').click();
        cy.get('.cart-empty').should('not.exist');
    });
    
    it('Ao fazer a compra de pelo menos um produto e visualizar o carrinho deve ter o botão Concluir Compra.', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message > .button').click();
        cy.get('.checkout-button').should('contain', 'Concluir compra');
    });

    it('Ao clicar em Concluir compra deve ser redirecionado para o checkout', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message > .button').click();
        cy.get('.checkout-button').click();
        cy.url().should('contain', '/checkout');
    });
    it('A página de faturamento deve conter campos para rótulos para cada input', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message > .button').click();
        cy.get('.checkout-button').click();
        cy.get('#billing_first_name_field > label').should('contain', 'Nome');
        cy.get('#billing_last_name_field > label').should('contain', 'Sobrenome');
        cy.get('#billing_company_field > label').should('contain', 'Nome da empresa');
        cy.get('#billing_country_field > label').should('contain', 'País');
        cy.get('#billing_address_1_field > label').should('contain', 'Endereço');
        cy.get('#billing_city_field > label').should('contain', 'Cidade');
        cy.get('#billing_state_field > label').should('contain', 'País');
        cy.get('#billing_postcode_field > label').should('contain', 'CEP');
        cy.get('#billing_phone_field > label').should('contain', 'Telefone');
        cy.get('#billing_email_field > label').should('contain', 'Endereço de e-mail');
        cy.get('.woocommerce-account-fields > .form-row > .woocommerce-form__label > span').should('contain', 'Criar uma conta?')
        cy.get('#order_comments_field > label').should('contain', 'Notas do pedido');
    });
    it('A página de faturamento deve conter campos obrigatórios com borda vermelha ao clicar em Finalizar Comprar', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message > .button').click();
        cy.get('.checkout-button').click();
        cy.get('form[name="checkout"]').submit()
        cy.get('#billing_first_name').parent().parent().should('have.class', 'woocommerce-invalid-required-field');
        cy.get('#billing_last_name').parent().parent().should('have.class', 'woocommerce-invalid-required-field');
        cy.get('#billing_address_1').parent().parent().should('have.class', 'woocommerce-invalid-required-field');
        cy.get('#billing_city').parent().parent().should('have.class', 'woocommerce-invalid-required-field');
        cy.get('#billing_postcode').parent().parent().should('have.class', 'woocommerce-invalid-required-field');
        cy.get('#billing_phone').parent().parent().should('have.class', 'woocommerce-invalid-required-field');
        cy.get('#billing_email').parent().parent().should('have.class', 'woocommerce-invalid-required-field');
    });

    it('Finalizando a compra', () => {
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Red').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message > .button').click();
        cy.get('.checkout-button').click();
        cy.get('#billing_first_name').type(data.nome);
        cy.get('#billing_last_name').type(data.sobrenome);
        cy.get('#billing_company').type(data.nomeDaEmpresa);
        cy.get('#select2-billing_country-container').type(data.pais)
        cy.get('[id$="-BR"]').click();
        cy.get('#select2-billing_state-container').type(data.estado)
        cy.get('[id$="-GO"]').click();
        cy.get('#billing_address_1').type(data.endereco);
        cy.get('#billing_city').type(data.cidade);
        cy.get('#billing_postcode').type(data.cep);
        cy.get('#billing_phone').type(data.telefone);
        cy.get('#billing_email').type(data.email);
        cy.get('#createaccount').check()
        cy.get('form[name="checkout"]').submit()
        cy.url().should('contain', '/order-received');
        cy.get('.page-title').should('contain', 'Pedido recebido');
        cy.get('address').should('contain', 'João da Silva Sauro');
        
    });
});