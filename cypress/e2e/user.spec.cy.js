
import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'
import MyInfoPage from '../pages/myInfoPage'


const Chance = require('chance')

const chance = new Chance()
const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
const myInfoPage = new MyInfoPage()

describe('OrangeHRM Tests', () => {


  it('should update personal details on the My Info page', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.validCredentials.username, userData.validCredentials.password)

    dashboardPage.checkDashboardPage()

    menuPage.accessMyInfo()

    myInfoPage.fillPersonalDetails(chance.first(), chance.first(), chance.last())
    myInfoPage.fillEmployeeDetails(chance.integer({ min: 2, max: 99 }), chance.ssn(), chance.cf(), userData.Myinfo.licenseExpiryDate)
    myInfoPage.fillStatus(userData.Myinfo.dOB)
    myInfoPage.saveFormPersonalDetails()
    
    myInfoPage.fillCommentField(chance.integer({ min: 1, max: 999 }), chance.sentence())
    

  })
   

})

