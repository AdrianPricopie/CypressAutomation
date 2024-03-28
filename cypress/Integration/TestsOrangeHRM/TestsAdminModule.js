import AdminPage from "../PageObjects/Admin_UserManagementPage"

describe('Admin/User Management functionality', function () {
    beforeEach(function () {
        // runs before each test in the block
        
        cy.LoginAccount("admin","admin123")
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        
        cy.fixture('TestDataAdminModule').then(function (data) {
            this.data = data;
        })
    })
    it('Verify If i can  successfully deleted a user from the system and no longer appears in the user list',function(){
        AdminPage.DeleteSecondAccountAndVerify();
    })

    it('Verify if I can add a new user ', function () {
       AdminPage.ClickAddUser()
       AdminPage.SelectUserRole(this.data.UserRole[0])
       AdminPage.SelectStatus(this.data.Status[0])
       AdminPage.SetEmployeName(this.data.EmployName)
       AdminPage.SetUserName(this.data.Username)
       AdminPage.SetPassword(this.data.Password)
       AdminPage.ConfirmPassword(this.data.Password)
       AdminPage.clickSaveButton()
       AdminPage.VerifyAccount(this.data.EmployName)

       //clean up , delete account
       AdminPage.DeleteAccountForCleanUP(this.data.EmployName)
    })
    
    it('Verify if when I try to create an account already existed ,an error will be displayed',function(){
        AdminPage.ClickAddUser()
        AdminPage.SelectUserRole(this.data.UserRole[0])
        AdminPage.SelectStatus(this.data.Status[0])
        AdminPage.SetEmployeName(this.data.EmployName)
        AdminPage.SetUserName(this.data.UsernameExist)
        AdminPage.SetPassword(this.data.Password)
        AdminPage.ConfirmPassword(this.data.Password)
        AdminPage.clickSaveButton()
        AdminPage.VerifyAnExistingAccount()

    })

    it('Verify that when the username field is filled with an existing account and the search button is pressed, the corresponding account should be displayed in the "Record Found" section',function(){
        AdminPage.UsernameInputSystemUser(this.data.UsernameExist)
        AdminPage.ClickSearchButton()
        AdminPage.VerifyAccount(this.data.UsernameExist)
    })

    it('Verify that when the user role is set  and the search button is pressed, the corresponding record should appear in the "Record Found" section.',function(){
        AdminPage.SelectUserRole(this.data.UserRole[0])
        AdminPage.ClickSearchButton()
        AdminPage.VerifyAccountSystemUser(this.data.UserRole[0])
    })
})

