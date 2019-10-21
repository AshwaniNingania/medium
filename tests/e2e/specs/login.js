describe('Login Follow Test', () => {
    it('Visit the Home Page', () => {
      cy.visit('/')
      cy.contains('a', 'Sign In')
      cy.contains('a', 'Sign Up')
      cy.contains('a', 'Home')
    });

    it('Navigate to sign in page', () => {
      cy.visit('/signin')
    });

    it('Sign in', () => {
      cy.contains('button', 'Sign In')
    });

  })