describe('Cypress Skills Checklist', () => {
  beforeEach(() => {
    if (Cypress.env('environment') === 'prod') {
      cy.visit('https://cypress-skills-checklist.s3.eu-central-1.amazonaws.com/index.html')
    } else {
      cy.visit('./src/index.html')
    }
  })

  context('Footer', () => {
    it('checking one checkbox changes the counter from zero to one', () => {
      cy.contains('footer', '0 /').should('be.visible')
      cy.contains('footer', '0%').should('be.visible')

      cy.get('main input[type="checkbox"]').first().check()

      cy.contains('footer', '1 /').should('be.visible')
      cy.contains('footer', '0%').should('not.exist')
    })

    it('checking all checkboxes leads to 100% completion and the DevOps level', () => {
      cy.get('input[type="checkbox"]').check()

      cy.contains('footer', '(100%) - Nível: DevOps').should('be.visible')
    })
  })

  context('Theme (light and dark mode)', () => {
    beforeEach(() => {
      cy.get('[data-theme="light"]').should('exist')
    })

    it('changes to the dark mode then back to light', () => {
      cy.get('button[aria-label^="Mudar para o tema"]')
        .as('themeToggleButton')
        .click()

      cy.get('[data-theme="dark"]').should('exist')
      cy.get('[data-theme="light"]').should('not.exist')

      cy.get('@themeToggleButton').click()

      cy.get('[data-theme="light"]').should('exist')
      cy.get('[data-theme="dark"]').should('not.exist')
    })
  })
})