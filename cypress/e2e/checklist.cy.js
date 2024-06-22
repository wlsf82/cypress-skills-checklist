describe('Cypress Skills Checklist', () => {
  beforeEach(() => {
    if (Cypress.env('environment') === 'prod') {
      cy.visit('https://cypress-skills-checklist.s3.eu-central-1.amazonaws.com/index.html')
    } else {
      cy.visit('./src/index.html')
    }
  })

  context('Perncentages', () => {
    it('checking one checkbox changes the percentage from zero to something greater than zero', () => {
      cy.contains('footer', '0%').should('be.visible')

      cy.get('main input[type="checkbox"]').first().check()

      cy.contains('footer', '%)').should('be.visible')
      cy.contains('footer', '0%').should('not.exist')
    })

    it('checking all checkboxes leads to 100% completion and advanced - Sr. level', () => {
      cy.get('input[type="checkbox"]').check()

      cy.contains('footer', '(100%) - Nível de habilidade: Avançado (Sr.)').should('be.visible')
    })
  })

  context('Theme (light and dark mode)', () => {
    beforeEach(() => {
      cy.get('[data-theme="light"]').should('exist')
    })

    it('changes to the dark mode than back to light', () => {
      cy.get('button[aria-label^="Switch to"]')
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