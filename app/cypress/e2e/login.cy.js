describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/login')
  })

  it('Check field presence', () => {
    cy.visit('/login')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
  })

  it('Check submit button presence', () => {
    cy.visit('/login')
    cy.get('button[type="submit"]').should('be.visible')
  })
})
