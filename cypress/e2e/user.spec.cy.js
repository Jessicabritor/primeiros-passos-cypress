
import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'
import MyInfoPage from '../pages/myInfoPage'



const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
const myInfoPage = new MyInfoPage()

describe('OrangeHRM Tests', () => {


  it.only('should update personal details on the My Info page', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.validCredentials.username, userData.validCredentials.password)

    dashboardPage.checkDashboardPage()

    menuPage.accessMyInfo()

    myInfoPage.fillPersonalDetails(userData.Myinfo.firstName, userData.Myinfo.middleName, userData.Myinfo.lastName)
    myInfoPage.fillEmployeeDetails(userData.Myinfo.employeeId, userData.Myinfo.otherId, userData.Myinfo.driversaLicense, userData.Myinfo.licenseExpiryDate)
    myInfoPage.fillStatus(userData.Myinfo.dOB)
    myInfoPage.saveForm
    
    myInfoPage.fillCommentField(userData.Myinfo.testeField, userData.Myinfo.comment)
   

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

