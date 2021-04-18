import { literals } from '../../src/core/i18n';

describe('Login specs', () => {

  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should name input has the focus when it clicks on it', () => {
    // Arrange

    // Act
    cy.visit('/');
    cy.get('input[name="user"]').as('userInput')
    cy.get('@userInput').click()

    // Assert
    cy.get('@userInput').should('have.focus');
  });

  it('should show error messages if login button is clicked and inputs are empty', () => {
    // Arrange

    // Act
    cy.visit('/');
    cy.findByRole('button').click();

    // Assert
    cy.findAllByText('Debe informar el campo').then((texts) => {
      expect(texts).to.have.length(2)
    });
  })

  it('should go to submodule-list when user writes right credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.get('input[name="user"]').as('userInput')
    cy.get('input[name="password"]').as('passwordInput')

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    // Assert
    cy.url().should('eq', 'http://localhost:8080/#/submodule-list');

  });
});
