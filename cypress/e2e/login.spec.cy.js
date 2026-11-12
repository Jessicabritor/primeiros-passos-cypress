import userData from '../fixtures/userData.json'

describe('OrangeHRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
   // sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
    wrongCredentialAlert: "[role='alert']",
    dashboardGrid: ".orangehrm-dashboard-grid"
  }


  it('Should log in successfully with valid credentials', () => {
    // Positive Test
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.validCredentials.username)
    cy.get(selectorsList.passwordField).type(userData.validCredentials.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
  })
  it('Should not log in with invalid credentials', () => {
    // Negative Test
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.invalidCredentials.username)
    cy.get(selectorsList.passwordField).type(userData.invalidCredentials.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})