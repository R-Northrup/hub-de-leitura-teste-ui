/// <reference types = "cypress"/>
import { faker } from '@faker-js/faker';

describe('Cadastro no Hub de Leitura', () => {
    beforeEach(() => {
        cy.visit ('register.html')});

    it('Deve fazer cadastro com sucesso usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`

        cy.get('#name').type ('Nome da Silva')
        cy.get('#email').type (email)
        cy.get('#phone').type ('11987456321')
        cy.get('#password').type ('Teste@teste123')
        cy.get('#confirm-password').type ('Teste@teste123')
        cy.get('#terms-agreement').click ('')
        cy.get('#register-btn').click ('')
        
        cy.url().should('include','dashboard')
    });

    it('Deve fazer cadastro com sucesso usando Faker', () => {
       
        let nome1 = faker.person.firstName()
        let nome2 = faker.person.lastName()
        let email = faker.internet.email({ firstName: nome1, lastName: nome2})

        cy.get('#name').type (`${nome1} ${nome2}`)
        cy.get('#email').type (email)
        cy.get('#phone').type ('11987456321')
        cy.get('#password').type ('Teste@teste123')
        cy.get('#confirm-password').type ('Teste@teste123')
        cy.get('#terms-agreement').click ('')
        cy.get('#register-btn').click ('')
        
        cy.url().should('include','dashboard')
        cy.get('#user-name').should ('contain', nome1)
    });




});