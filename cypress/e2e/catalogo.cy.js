/// <reference types = "cypress"/>

describe('Funcionalidade: catálogo de livros', () => {
    beforeEach(() => {
        cy.visit('catalog.html')
    });    
    
    it.skip('Deve clicar no botão "adicionar à Cesta"', () => {
        cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()

        cy.get('#cart-count').should ('have.text', 1)
        cy.get('#global-alert-container').should('contain', '1984')
    });    

    it('Deve clicar em todos os botões "Adicionar à Cesta"', () => {
        cy.get('.btn-primary').click({multiple:true})
        
        cy.get('#cart-count').should ('have.text', 12)
    });

    it('Deve clicar no primeiro botão "Adicionar à Cesta', () => {
        cy.get('.btn-primary').first().click()

         cy.get('#cart-count').should ('have.text', 1)
         cy.get('#global-alert-container').should('contain', '1984')
    });

    it('Deve clicar no último botão "Adicionar à Cesta"', () => {
         cy.get('.btn-primary').last().click()

         cy.get('#cart-count').should ('have.text', 1)
         cy.get('#global-alert-container').should('contain', 'Alquimista')
    });

    it('Deve clicar no terceiro botão "Adicionar à Cesta"', () => {
        cy.get('.btn-primary').eq(2).click()

        cy.get('#cart-count').should ('have.text', 1)
        cy.get('#global-alert-container').should('contain', 'Divina')
    });

    it('Deve clicar no quinto botão "Adicionar à Cesta"', () => {
        cy.get('.btn-primary').eq(4).click()

        cy.get('#cart-count').should ('have.text', 1)
        cy.get('#global-alert-container').should('contain', 'Metamorfose')
    });

    it('Deve clicar no nome do livro e redirecionar para a tela do livro', () => {
        cy.contains('Dom Casmurro').click()
        cy.url().should('contain', 'id=1')
        cy.contains('à').click()

        cy.get('#alert-container').should('contain', 'Livro adicionado')

    });


});