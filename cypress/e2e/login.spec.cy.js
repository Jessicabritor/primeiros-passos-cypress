
import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()

describe('Login OrangeHRM Tests', () => {


  it.only('Should not log in with invalid credentials', () => {
    // Negative Test
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.invalidCredentials.username, userData.invalidCredentials.password)
    loginPage.verifyInvalidCredentialsAlert()
  })

 it('Should log in with valid credentials', () => {
    // Positive Test
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.validCredentials.username, userData.validCredentials.password)
    dashboardPage.checkDashboardPage() 
  })

})


