
import userData from '../fixtures/userData.json'

describe('OrangeHRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    wrongCredentialAlert: "[role='alert']",
    dashboardGrid: ".orangehrm-dashboard-grid",
    myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
    firstNameField: "[name='firstName']",
    middleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    selectionsField: ".oxd-select-text-input",
    genderField: ".oxd-radio-wrapper",
    saveButton: "[type='submit']",
    successfulPopUp: "#oxd-toaster_1",
    addFileField: ".oxd-button--text",
    selectFile: ".oxd-file-button",
    commentField: "[placeholder='Type comment here']"

  }

  it('Should log in successfully with valid credentials', () => {
    // Positive Test
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.validCredentials.username)
    cy.get(selectorsList.passwordField).type(userData.validCredentials.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid).should('be.visible') 
  })
  it.only('should update personal details on the My Info page', () => {
    // Positive Test
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.validCredentials.username)
    cy.get(selectorsList.passwordField).type(userData.validCredentials.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid).should('be.visible')
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type(userData.Myinfo.firstName)
    cy.get(selectorsList.middleNameField).clear().type(userData.Myinfo.middleName)
    cy.get(selectorsList.lastNameField).clear().type(userData.Myinfo.lastName)
    cy.get(selectorsList.genericField).eq(3).clear().type(userData.Myinfo.employeeId)
    cy.get(selectorsList.genericField).eq(4).clear().type(userData.Myinfo.otherId)
    cy.get(selectorsList.genericField).eq(5).clear().type(userData.Myinfo.driversaLicense)
    cy.get(selectorsList.genericField).eq(6).clear().type(userData.Myinfo.licenseExpiryDate).should('have.value', userData.Myinfo.licenseExpiryDate) //Funciona
    cy.get(selectorsList.genericField).eq(6).type('{enter}')
    cy.get(selectorsList.selectionsField).eq(0).click()
    cy.contains(userData.Myinfo.nationality).click()
    cy.get(selectorsList.selectionsField).eq(1).click()
    cy.contains(userData.Myinfo.maritalStatus).click()
    cy.get(selectorsList.genericField).eq(8).clear().type(userData.Myinfo.dOB).should('have.value', userData.Myinfo.dOB).blur()
    cy.get(selectorsList.genderField).eq(0).click()
    cy.get(selectorsList.saveButton).eq(0).click()
    cy.get('body').should('contain', userData.Myinfo.messagePopUp)
    cy.get(selectorsList.selectionsField).eq(2).click()
    cy.contains(userData.Myinfo.bloodType).click()
    cy.get(selectorsList.genericField).eq(9).clear().type(userData.Myinfo.testeField)
    cy.get(selectorsList.saveButton).eq(1).click()
    cy.get('body').should('contain', userData.Myinfo.messagePopUp)
    cy.get(selectorsList.addFileField).click()
    cy.get(selectorsList.selectFile).click()
    cy.get(selectorsList.commentField).type(userData.Myinfo.comment)
    cy.get(selectorsList.saveButton).eq(2).click()
    cy.get('body').should('contain', userData.Myinfo.messagePopUp)
    

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