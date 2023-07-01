describe('My Second Test', () => {
  it('visits the registration page', () => {
    cy.visit('/register')
  })

  it('Check form fields presence', () => {
    cy.visit('/register')
    cy.get('input[type="text"]').first().should('exist')
    cy.get('input[type="text"]').eq(1).should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
  })

  it('Check submit button presence', () => {
    cy.visit('/register')
    cy.get('button[type="submit"]').should('be.visible')
  })
})
