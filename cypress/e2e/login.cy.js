/// <reference types = "cypress"/>
import user from "../fixtures/usuario.json"

describe('funcionalidade: Login', () => {
    beforeEach(() => {cy.visit('login.html')});

    it('Deve fazer login com sucesso', () => {
        cy.get('#email').type('usuario@teste.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()

        cy.url().should('contain', 'dashboard')
    });
    

    it('Deve fazer login com sucesso usando comando customizado', () => {
        cy.login('usuario@teste.com', 'user123')
    });


    it('Deve fazer login com sucesso usando conta admin', () => {
        cy.login('admin@biblioteca.com', 'admin123')
    });



    it('Deve fazer login com sucesso - usando importação da massa de dados', () => {
        cy.login(user[0].email, user[0].senha)
    });

    it('Deve fazer login com sucesso - usando importação da massa de dados(admin)', () => {
        cy.login(user[1].email, user[1].senha)
    });
});