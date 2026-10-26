describe('Funcionalidade: Contato', () => {

beforeEach(() => {
  //como o nome indica, antes de cada teste isso daqui será feito. Ou seja, apenas precisaria mudar aqui e não em cada um dos testes.
  cy.visit('index.html')
});

  it("Deve preencher formulário de contato com sucesso", () => {
  // Adicionando o nome
    cy.get('[name="name"]').type('Zé Ninguém da Silva')
    //depois o email
    cy.get('[name="email"]').type("emailmuitovalido123@email.com")
    // selecionano o assunto e confirmando que ele foi selecionado com sucesso
    cy.get('[name="subject"]').select('Sugestões').should('have.value', 'Sugestões')
    // inserindo uma mensagem de teste
    cy.get('[name="message"]').type('Mensagem de teste apenas dale 123')
    // clicando no botão para enviar
    cy.get('#btn-submit > .fas').click()
    // garantindo que a mensagem de sucesso foi exibida, indicando que o teste deu certo
    cy.contains('Contato enviado com sucesso!').should('exist')
    // eba, você conseguiu!
  })

it ('Deve validar a mensagem de erro ao enviar sem o nome', () => {
  cy.get('[name="name"]').clear ('')
  cy.get('[name="email"]').type ('emailmuitovalido123@email.com')
  cy.get('[name="subject"]').select ('Sugestões').should ('have.value', 'Sugestões')
  cy.get('[name="message"]').type ('mensagem de teste apenas dale 123')
  cy.get('#btn-submit').click ('')
  cy.get('#alert-container').should ('contain', 'Por favor, preencha o campo Nome')
  })

  it('Deve validar a mensagem de erro ao enviar sem o email', () => {
  cy.get('[name="name"]').type('Zé Ninguém da Silva')
  cy.get('[name="email"]').clear ('')
  cy.get('[name="subject"]').select ('Sugestões').should ('have.value', 'Sugestões')
  cy.get('[name="message"]').type ('mensagem de teste apenas dale 123')
  cy.get('#btn-submit').click ('')
  cy.get('#alert-container').should ('contain', 'Por favor, preencha o campo E-mail')

  })


  it('Deve validar a mensagem de erro ao enviar sem o assunto', () => {
  cy.get('[name="name"]').type('Zé Ninguém da Silva')
  cy.get('[name="email"]').type ('emailmuitovalido123@email.com')
  
  cy.get('[name="message"]').type ('mensagem de teste apenas dale 123')
  cy.get('#btn-submit').click ('')
  cy.get('#alert-container').should ('contain', 'Por favor, selecione o Assunto')

  })


  it('Deve validar a mensagem de erro ao enviar sem mensagem', () => {
  cy.get('[name="name"]').type('Zé Ninguém da Silva')
  cy.get('[name="email"]').type ('emailmuitovalido123@email.com')
  cy.get('[name="subject"]').select ('Sugestões').should ('have.value', 'Sugestões')
  cy.get('[name="message"]').clear ('')
  cy.get('#btn-submit').click ('')
  cy.get('#alert-container').should ('contain', 'Por favor, escreva sua Mensagem')

  })



  
});