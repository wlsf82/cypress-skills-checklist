describe('Cypress Skills Checklist', () => {
  beforeEach(() => {
    const url = Cypress.env('environment') === 'prod' ?
      'https://cypress-skills-checklist.s3.eu-central-1.amazonaws.com/index.html' :
      './src/index.html'
    
    cy.visit(url)

    cy.contains('footer', '0 / ').should('be.visible')
    cy.contains('footer', '(0%) - Nível: Iniciante (Jr.)').should('be.visible')
  })

  context('Footer', () => {
    it('checking one checkbox changes the counter from zero to one', () => {
      cy.contains('footer', '0 /').should('be.visible')
      cy.contains('footer', '0%').should('be.visible')

      cy.get('main input[type="checkbox"]').first().check()

      cy.contains('footer', '1 /').should('be.visible')
      cy.contains('footer', '0%').should('not.exist')
    })

    it('checking less than 50% of checkboxes keeps the skill at junior level', () => {
      cy.get('input[type="checkbox"]')
        .its('length')
        .then(length => {
          const numOfCheckboxesEquivalentoToLessThanFiftyPercent = Math.floor((length * .5) - 1)
          const tempArray = Array(numOfCheckboxesEquivalentoToLessThanFiftyPercent).fill(0)
          tempArray.forEach((_, index) => {
            cy.get('input[type="checkbox"]').eq(index).check()
          })
        })

      cy.contains('footer', 'Nível: Iniciante (Jr.)').should('be.visible')
    })

    it('checking at least 50% of checkboxes changes the skill to mid-level', () => {
      cy.get('input[type="checkbox"]')
        .its('length')
        .then(length => {
          const numOfCheckboxesEquivalentoToAtLeastFiftyPercent = Math.ceil(length * .5)
          const tempArray = Array(numOfCheckboxesEquivalentoToAtLeastFiftyPercent).fill(0)
          tempArray.forEach((_, index) => {
            cy.get('input[type="checkbox"]').eq(index).check()
          })
        })

      cy.contains('footer', 'Nível: Intermediário (Pleno)').should('be.visible')
    })

    it('checking at least 75% of checkboxes changes the skill to senior level', () => {
      cy.get('input[type="checkbox"]')
        .its('length')
        .then(length => {
          let numOfCheckboxesEquivalentoToAtLeastSeventyFivePercent = Math.ceil(length * .75)
          const tempArray = Array(numOfCheckboxesEquivalentoToAtLeastSeventyFivePercent).fill(0)
          tempArray.forEach((_, index) => {
            cy.get('input[type="checkbox"]').eq(index).check()
          })
        })

      cy.contains('footer', 'Nível: Avançado (Sr.)').should('be.visible')
    })

    it('checking at least 95% of checkboxes changes the skill to DevOps level', () => {
      cy.get('input[type="checkbox"]')
        .its('length')
        .then(length => {
          let numOfCheckboxesEquivalentoToAtLeastNinetyFivePercent = Math.ceil(length * .95)
          const tempArray = Array(numOfCheckboxesEquivalentoToAtLeastNinetyFivePercent).fill(0)
          tempArray.forEach((_, index) => {
            cy.get('input[type="checkbox"]').eq(index).check()
          })
        })

      cy.contains('footer', 'Nível: DevOps').should('be.visible')
    })

    it('claps to those who reach 100% of completion', () => {
      cy.get('input[type="checkbox"]').check()

      cy.contains('footer', '(100%) - Nível: DevOps 👏👏👏').should('be.visible')
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