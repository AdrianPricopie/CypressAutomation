class LoginPage {
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    fillUsername(username) {
        cy.get('input[name="username"]').type(username);
    }

    fillPassword(password) {
        cy.get('input[name="password"]').type(password);
    }

    submitLogin() {
        cy.get('button[type="submit"]').click();
    }

    getErrorMessage() {
        return cy.get("div.oxd-alert p");
    }

    getRequiredErrorMessage() {
        return cy.get('.oxd-input-group > .oxd-text');
    }

    clickDropDown(){
       cy.get(".oxd-userdropdown-tab").click();
    }
}

export default new LoginPage();
