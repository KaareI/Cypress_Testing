describe('To-Do List App', () => {
  beforeEach(() => {
    cy.visit('https://seppelkarlkaareltaniel.ikt.khk.ee/cypress/')
  })

  it('should add a new task to the list when "Add" button is clicked', () => {
    const taskName = 'Buy groceries'

    cy.get('#myInput')
      .type(taskName)

    cy.get('.addBtn')
      .click()

    cy.get('#myUL')
      .contains('li', taskName)
      .should('exist')
  })

  it('should not add a new task to the list when "Add" button is clicked and input field is empty', () => {
    cy.get('.addBtn')
      .click()

    cy.get('#myUL li')
      .should('have.length', 6) // the initial tasks

    cy.on('window:alert', (str) => {
      expect(str).to.equal('You must write something!')
    })
  })

  it('should mark a task as "checked" when clicked', () => {
    cy.get('#myUL li')
      .contains('Read a book')
      .click()

      cy.get('li.checked').should('have.length.gte', 1)

  })

  it('should remove a task when "x" button is clicked', () => {
    cy.get('#myUL li')
      .each(($li) => {
        cy.wrap($li)
          .find('span')
          .click()

      })
      cy.get('#myUL li')
      .each(($li) => {
        cy.wrap($li)
          .should('not.be.visible')
      })
  })
  
})