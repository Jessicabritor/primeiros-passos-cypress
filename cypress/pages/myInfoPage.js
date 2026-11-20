import userData from '../fixtures/userData.json'

class MyInfoPage {

    selectorsList() {
        const selectors = {
            firstNameField: "[name='firstName']",
            middleNameField: "[name='middleName']",
            lastNameField: "[name='lastName']",
            genericField: ".oxd-input--active",
            selectionsField: ".oxd-select-text-input",
            genderField: ".oxd-radio-wrapper",
            saveButton: "[type='submit']",
            successfulPopUp: "#oxd-toaster_1",
            testeField: "[options='']",
            addFileField: ".oxd-button--text",
            fileInput: 'input[type="file"]',
            selectFile: ".oxd-file-button",
            commentField: "[placeholder='Type comment here']"
        }

        return selectors

    }

    fillPersonalDetails(firstName, middleName, lastName) {
        cy.get(this.selectorsList().firstNameField).clear().type(firstName)
        cy.get(this.selectorsList().middleNameField).clear().type(middleName)
        cy.get(this.selectorsList().lastNameField).clear().type(lastName)

    }
     fillEmployeeDetails(employeeId, otherId, driversaLicense, licenseExpiryDate) {
        cy.get(this.selectorsList().genericField).eq(3).clear().type(employeeId)
        cy.get(this.selectorsList().genericField).eq(4).clear().type(otherId)
        cy.get(this.selectorsList().genericField).eq(5).clear().type(driversaLicense)
        cy.get(this.selectorsList().genericField).eq(6).clear().type(licenseExpiryDate).should('have.value', licenseExpiryDate)
        cy.get(this.selectorsList().genericField).eq(6).type('{enter}')
     }

     saveFormPersonalDetails() {
        cy.get(this.selectorsList().saveButton).eq(0).click()
        cy.get('body').should('contain', userData.Myinfo.messagePopUp)

     }

     fillStatus(dOB) {
        cy.get(this.selectorsList().selectionsField).eq(0).click()
        cy.contains(userData.Myinfo.nationality).click()
        cy.get(this.selectorsList().selectionsField).eq(1).click()
        cy.contains(userData.Myinfo.maritalStatus).click()
        cy.get(this.selectorsList().genericField).eq(8).clear().type(dOB).should('have.value', dOB).blur()
        cy.get(this.selectorsList().genderField).eq(0).click()

     }

     fillCommentField(testeField, comment ) {
        cy.get(this.selectorsList().selectionsField).eq(2).click()
        cy.contains(userData.Myinfo.bloodType).click()
        cy.get(this.selectorsList().genericField).eq(9).clear().type(testeField)
        cy.get(this.selectorsList().saveButton).eq(1).click()
        cy.get(this.selectorsList().successfulPopUp).should('be.visible')
        cy.get(this.selectorsList().addFileField).click()
        cy.get(this.selectorsList().fileInput).selectFile('cypress/files/test-file.pdf', { force: true })
        cy.get(this.selectorsList().selectFile).click()
        cy.get(this.selectorsList().commentField).type(comment)
        cy.get(this.selectorsList().saveButton).eq(2).click()
        cy.get(this.selectorsList().successfulPopUp).should('be.visible')
     }

      saveContactDetails() {
       cy.get(this.selectorsList().saveButton).eq(1).click()
       cy.get(this.selectorsList().successfulPopUp).should('be.visible')

     }
}


export default MyInfoPage