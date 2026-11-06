/// <reference types = "cypress"/>
import { faker, fakerPT_BR } from '@faker-js/faker';
import CadastroPage from '../support/pages/cadastro-page';
import cadastroPage from '../support/pages/cadastro-page';


describe('Cadastro no Hub de Leitura', () => {
    beforeEach(() => {
        CadastroPage.visitarPaginaCadastro()
    });



    it('Deve fazer cadastro com sucesso usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`

        cy.get('#name').type('Nome da Silva')
        cy.get('#email').type(email)
        cy.get('#phone').type('11987456321')
        cy.get('#password').type('Teste@teste123')
        cy.get('#confirm-password').type('Teste@teste123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()

        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso usando Faker', () => {

        let nome1 = faker.person.firstName()
        let nome2 = faker.person.lastName()
        let email = faker.internet.email({ firstName: nome1, lastName: nome2 })

        cy.get('#name').type(`${nome1} ${nome2}`)
        cy.get('#email').type(email)
        cy.get('#phone').type('11987456321')
        cy.get('#password').type('Teste@teste123')
        cy.get('#confirm-password').type('Teste@teste123')
        cy.get('#terms-agreement').click('')
        cy.get('#register-btn').click('')

        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome1)
    });

    it('Deve preencher cadastro com sucesso utilizando comandos customizados', () => {

        let nome1 = faker.person.firstName()
        let nome2 = faker.person.lastName()
        let email = faker.internet.email({ firstName: nome1, lastName: nome2 })
        let telefone = fakerPT_BR.phone.number()
        let senha = fakerPT_BR.internet.password({ length: 12, symbols: true, numbers: true, memorable: true })
        let confirmarSenha = senha

        cy.preencherCadastro(
            `${nome1} ${nome2}`,
            email,
            telefone,
            senha,
            confirmarSenha)
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso - usando Page Objects', () => {
        let nome1 = faker.person.firstName()
        let nome2 = faker.person.lastName()
        let email = faker.internet.email({ firstName: nome1, lastName: nome2 })
        let telefone = fakerPT_BR.phone.number()
        let senha = fakerPT_BR.internet.password({ length: 12, symbols: true, numbers: true, memorable: true })
        let confirmarSenha = senha

        CadastroPage.preencherCadastro(`${nome1} ${nome2}`, email, telefone, senha, confirmarSenha)
        cy.url().should('include', 'dashboard')
    });

    it('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        let email = `teste${Date.now()}@teste.com`
        let telefone = fakerPT_BR.phone.number()
        let senha = fakerPT_BR.internet.password({ length: 12, symbols: true, numbers: true, memorable: true })
        let confirmarSenha = senha
        cadastroPage.preencherCadastro('', email, telefone, senha, confirmarSenha)
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', ' pelo menos 2 caracteres')
    });

    it('Deve validar mensagem ao tentar cadastrar sem preencher email', () => {
        let nome1 = faker.person.firstName()
        let nome2 = faker.person.lastName()
        let telefone = fakerPT_BR.phone.number()
        let senha = fakerPT_BR.internet.password({ length: 20 })
        let confirmarSenha = senha
        cadastroPage.preencherCadastro(`${nome1} ${nome2}`, '', telefone, senha, confirmarSenha)
        cy.get('#register-form > :nth-child(2) > .invalid-feedback').should('contain', 'Email válido é obrigatório')
    });


    it('Deve validar mensagem ao tentar cadastrar com senhas que não coincidem', () => {
        let nome1 = faker.person.firstName()
        let nome2 = faker.person.lastName()
        let email = faker.internet.email({ firstName: nome1, lastName: nome2 })
        let telefone = fakerPT_BR.phone.number()
        let confirmarSenha = '123dfsfgd'
        cadastroPage.preencherCadastro(`${nome1} ${nome2}`, email, telefone, '', confirmarSenha)
        cy.get(':nth-child(5) > .invalid-feedback').should('contain', 'coincidem')
    });
});