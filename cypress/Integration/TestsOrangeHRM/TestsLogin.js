import LoginPage from "../PageObjects/LoginPage";

describe('Login Functionality', function () {
    beforeEach(function () {
        // runs before each test in the block
        LoginPage.visit();
        cy.fixture('TestDataForLogin').then(function (data) {
            this.data = data;
        })
    })

    it('Verify if I can log in with valid credentials and redirection to the dashboard', function () {
        LoginPage.fillUsername(this.data.ValidUsername);
        LoginPage.fillPassword(this.data.ValidPassword);
        LoginPage.submitLogin();
        cy.url().should('include', 'dashboard');
    })

    it('Verify if I can see an error when I try to log in with invalid credentials', function () {
        LoginPage.fillUsername(this.data.InvalidUsername);
        LoginPage.fillPassword(this.data.InvalidPassword);
        LoginPage.submitLogin();
        LoginPage.getErrorMessage().should('have.text', 'Invalid credentials');
    })

    it('Verify if I can see an error when I try to log in without enter password', function () {
        LoginPage.fillUsername(this.data.ValidUsername);
        LoginPage.submitLogin();
        LoginPage.getRequiredErrorMessage().should('have.text', 'Required');
    })

    it('Verify if I can see an error when I try to log in without enter username', function () {
        LoginPage.fillPassword(this.data.InvalidPassword);
        LoginPage.submitLogin();
        LoginPage.getRequiredErrorMessage().should('have.text', 'Required');
    })

    it('Verify if I can see two error messages in username and password field when I try to log in  without completing any mandatory field', function () {
        LoginPage.submitLogin();
        LoginPage.getRequiredErrorMessage().should('have.length', 2).each(($el) => {
            expect($el.text()).to.equal('Required');
        })
    })

    it('Verify if I can successfully log out', function () {
        LoginPage.fillUsername(this.data.ValidUsername);
        LoginPage.fillPassword(this.data.ValidPassword);
        LoginPage.submitLogin();

        cy.url().should('include', 'dashboard');

        LoginPage.clickDropDown()

        cy.contains('Logout').click();
        cy.url().should('include', 'auth/login');
    })
})
