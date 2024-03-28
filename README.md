# Automated Testing Project for OrangeHRM Website :computer:
Welcome to the documentation for the automated testing project designed for the OrangeHRM website. This project leverages Cypress and the POM framework to implement a robust suite of tests, ensuring the functionality and reliability.
## Table of Contents

1. [Introduction/Tools and version](#introduction-notebook)
2. [Project Structure](#project-structure)
3. [Test Scenario](#test-scenarios-for-login-functionality)
4. [Getting-Started](#getting-started--pushpin)
7. [Reports](#reports)

# Introduction :notebook:
 
This project aims to implement automated tests for the OrangeHRM opensource website using Cypress and POM(Page object oriented) framework. 
The primary objectives include simulating user interactions and login in account ,add users,delete users,search users.

- Language:**JavaScript**
- Editor code:**VsCode**
- Library:
  - [![Cypress](https://img.shields.io/npm/v/cypress?color=33ff99&label=cypress&logo=cypress&logoColor=33ff99&style=for-the-badge)](https://www.cypress.io)
  - cypress-mochawesome-reporter 3.8.2

OrangeHRM is a Human Resources Management (HRM) system that provides software solutions for efficiently managing HR departments in businesses and organizations.
OrangeHRM offers various functionalities, including employee data management, recruitment and selection, employee training, performance management, leave and absence management, report generation, as well as other HR-related aspects.
OrangeHRM is available as open-source software or as cloud-based and on-premise solutions, catering to the diverse needs of businesses of different sizes and industries. The OrangeHRM website provides more information about their 
products and services, including demos, user guides, technical support, and other useful resources for clients and users.

- [Documentation](https://www.orangehrm.com/assets/Files/Live-3-0User-Guide-For-Administrative-Users-v2.pdf)

- [Website](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login)

# Project Structure 

![Structure](https://github.com/AdrianPricopie/CypressAutomation/blob/main/Screenshot%202024-03-24%20at%2023.36.16.png)

- **cypress/**: This is the main directory of the Cypress project.
- **cypress/fixtures/**: Static test data, such as JSON files, is stored here.
- **cypress/integration/**: All spec files for tests are stored here. Inside this directory, each subdirectory corresponds to a specific testing module.
- **cypress/support/**: Custom Cypress commands and other support files are defined here.
- **cypress/integration/PageObjects/**: Classes representing page objects for different pages of the OrangeHRM website are stored here.
- **cypress/integration/TestsOrangeHRM/**: All the tests are stored here.
- **cypress/reports/**: This directory is where Cypress generates test reports.

Fixtures -> TestDataAdminModule
```JavaScript
{
    "UserRole": ["Admin","ESS"],
    "Status":    ["Enabled","Disabled"],
    "EmployName": "Rahul Das",
    "Username": "zrVfce3dswwdqssdqsRR",
    "Password": "adsahi32#vdF",
    "UsernameExist": "Admin"
  }

 ```
Fixtures->TestDataLogin
```JavaScript
{
  "name": "bob",
  "gender": "Female",
  "ProductName":["Blackberry","Nokia Edge"],
  "ValidUsername":"Admin",
  "ValidPassword":"admin123",
  "InvalidUsername":"ADdsad",
  "InvalidPassword":"Sdsad",
  "SelectUser":["ESS","Admin"]
}

 ```

In the support directory, within the commands.js file, I've created a new command for authentication. Then, I will add it to the beforeEach hook in the tests within the admin module
```JavaScript
Cypress.Commands.add('LoginAccount', (username, password) => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); // Asigură-te că aceasta este ruta către pagina de autentificare
  
    // Completează câmpurile de utilizator și parolă și trimite formularul
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });


 ```

### Test Scenarios for Login Functionality:

1. **Login with Valid Credentials:**
   - Description: User enters valid username and password and clicks the login button.
   - Actions:
     1. Enters a valid username.
     2. Enters a valid password.
     3. Clicks the login button.
   - Expected:
     - User is redirected to the dashboard.
    
 ```JavaScript
   it('Verify if I can log in with valid credentials and redirection to the dashboard', function () {
        LoginPage.fillUsername(this.data.ValidUsername);
        LoginPage.fillPassword(this.data.ValidPassword);
        LoginPage.submitLogin();
        cy.url().should('include', 'dashboard');
    })
 ```

2. **Login with Invalid Credentials:**
   - Description: User enters invalid username and password and clicks the login button.
   - Actions:
     1. Enters an invalid username.
     2. Enters an invalid password.
     3. Clicks the login button.
   - Expected:
     - An error message indicating invalid credentials is displayed.
 ```JavaScript
   it('Verify if I can see an error when I try to log in with invalid credentials', function () {
        LoginPage.fillUsername(this.data.InvalidUsername);
        LoginPage.fillPassword(this.data.InvalidPassword);
        LoginPage.submitLogin();
        LoginPage.getErrorMessage().should('have.text', 'Invalid credentials');
    })
    
 ```    
   

3. **Login Without Entering Password:**
   - Description: User enters only the username and clicks the login button.
   - Actions:
     1. Enters a valid username.
     2. Leaves the password field empty.
     3. Clicks the login button.
   - Expected:
     - An error message indicating password is required is displayed.
 ```JavaScript
it('Verify if I can see an error when I try to log in without enter password', function () {
        LoginPage.fillUsername(this.data.ValidUsername);
        LoginPage.submitLogin();
        LoginPage.getRequiredErrorMessage().should('have.text', 'Required');
    })
    
 ```



4. **Login Without Entering Username:**
   - Description: User enters only the password and clicks the login button.
   - Actions:
     1. Leaves the username field empty.
     2. Enters a valid password.
     3. Clicks the login button.
   - Expected:
     - An error message indicating username is required is displayed.
 ```JavaScript
  it('Verify if I can see an error when I try to log in without enter username', function () {
        LoginPage.fillPassword(this.data.InvalidPassword);
        LoginPage.submitLogin();
        LoginPage.getRequiredErrorMessage().should('have.text', 'Required');
    })

    
 ```    
   

5. **Login Without Completing Mandatory Fields:**
   - Description: User attempts to login without completing any of the mandatory fields (username and password).
   - Actions:
     1. Leaves both mandatory fields empty.
     2. Clicks the login button.
   - Expected:
     - Error messages for both fields indicating they are required are displayed.
    
 ```JavaScript
  it('Verify if I can see two error messages in username and password field when I try to log in  without completing any mandatory field', function () {
        LoginPage.submitLogin();
        LoginPage.getRequiredErrorMessage().should('have.length', 2).each(($el) => {
            expect($el.text()).to.equal('Required');
        })
    })
    
 ```    
   
  
6. **Verify Successful Logout:**

   - Description: After successfully logging in, the user logs out of the system and verifies redirection to the login page.
   - Actions:
     1. Fill in the valid username and password.
     2. Submit the login form.
     3. Verify redirection to the dashboard.
     4. Click on the drop-down menu.
     5. Click on the "Logout" option.
   - Expected:
     - After clicking "Logout", the user is redirected to the login page.
    
  ```JavaScript
   it('Verify if I can successfully log out', function () {
        LoginPage.fillUsername(this.data.ValidUsername);
        LoginPage.fillPassword(this.data.ValidPassword);
        LoginPage.submitLogin();

        cy.url().should('include', 'dashboard');

        LoginPage.clickDropDown()

        cy.contains('Logout').click();
        cy.url().should('include', 'auth/login');
    })
    
 ```    
   
    
### Test Scenarios for Admin/User Management Functionality:

1. **Verify Successful Deletion of a User:**
   - Description: Admin deletes a user from the system and verifies that the user no longer appears in the user list.
   - Actions:
     1. Navigate to the Admin/User Management page.
     2. Delete the second user from the system.
.
   - Expected:
     - The user is successfully deleted, and the user no longer appears in the user list.
    
  ```JavaScript
  it('Verify If i can  successfully deleted a user from the system and no longer appears in the user list',function(){
        AdminPage.DeleteSecondAccountAndVerify();
    })
 ```

 this  deletethirdAccountAndVerify fuction is in Admin_userManagementPage.js class AdminPage
 ```JavaScript
   DeleteSecondAccountAndVerify() {
                // Iterăm prin fiecare rând din tabel
                cy.get('.oxd-table-card').each(($el,index) => {
                    if(index === 1){
                    const deletedUserName = $el.text().trim();
                    cy.log(deletedUserName)
                    
                    // Facem clic pe butonul de ștergere pentru acest utilizator
                    cy.wrap($el).find('button[type="button"]').eq(0).click({ force: true });
            
                    // Așteptăm ca butonul de confirmare pentru ștergere să fie vizibil
                    cy.get('.oxd-button--label-danger').should('be.visible');
            
                    // Facem clic pe butonul de confirmare pentru ștergere
                    cy.get('.oxd-button--label-danger').click();
            
                    // Verificăm că numele utilizatorului a fost șters
                    this.VerifyAccountAfterDelete(deletedUserName);
                    }
                });
            }
            VerifyAccountAfterDelete(name) {
                let nameExists = false;
                
                // Verificăm dacă numele utilizatorului mai există în tabel
                cy.get('.oxd-table-card').each(($el) => {
                    const text = $el.text();
                    if (text.includes(name)) {
                        nameExists = true;
                    }
                }).then(() => {
                    // Verificăm că numele utilizatorului nu mai există în tabel
                    expect(nameExists).to.be.false;
                });
            }
    
 ```    
   

2. **Verify Addition of a New User:**
   - Description: Admin adds a new user to the system.
   - Actions:
     1. Click on the "Add User" button.
     2. Fill in the user details (user role, status, employee name, username, password, etc.).
     3. Save the user.
   - Expected:
     - The new user is added successfully to the system, and the user appears in the user list.

 ```JavaScript
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
    
    
 ```    
   

3. **Verify Error Message for Existing User:**
   - Description: Admin attempts to create a user with a username that already exists in the system.
   - Actions:
     1. Click on the "Add User" button.
     2. Fill in the user details with an existing username.
   - Expected:
     - An error message indicating that the username already exists is displayed.
 ```JavaScript
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
    
 ```    
   
4. **Verify Search for Existing User by Username:**
   - Description: Admin searches for an existing user by entering the username.
   - Actions:
     1. Enter the username of an existing user in the search field.
     2. Click the search button.
   - Expected:
     - The corresponding user account is displayed in the "Record Found" section.
 ```JavaScript
   it('Verify that when the username field is filled with an existing account and the search button is pressed, the corresponding account should be displayed in the "Record Found" section',function(){
        AdminPage.UsernameInputSystemUser(this.data.UsernameExist)
        AdminPage.ClickSearchButton()
        AdminPage.VerifyAccount(this.data.UsernameExist)
    })
    
 ```    
   
5. **Verify Search for User by User Role:**
   - Description: Admin searches for users based on their user role.
   - Actions:
     1. Select a specific user role from the dropdown.
     2. Click the search button.
   - Expected:
     - The user accounts with the selected user role are displayed in the "Record Found" section.

 ```JavaScript
 
    it('Verify that when the user role is set  and the search button is pressed, the corresponding record should appear in the "Record Found" section.',function(){
        AdminPage.SelectUserRole(this.data.UserRole[0])
        AdminPage.ClickSearchButton()
        AdminPage.VerifyAccountSystemUser(this.data.UserRole[0])
    })
    
 ```   
    

## Getting Started  :pushpin:


1.**Prerequisites:**

Make sure you have installed the following prerequisites on your development machine:

| OS      | Node                                    |
| ------- | --------------------------------------- |
| Windows | `winget install --id OpenJS.NodeJS.LTS` |
|         | ` npm i --save-dev cypress-mochawesome-reporter`        |
| macOS   | `brew install node@20`    
|         | ` npm i --save-dev cypress-mochawesome-reporter`        |


2. **Clone the Repository:**

    ```bash
    git clone https://github.com/AdrianPricopie/CypressAutomation.git
    ```

4. **Run all the tests with html report:**

    ```bash
    npm run tests
    ```

## Reports

![](https://github.com/AdrianPricopie/CypressAutomation/blob/main/Screenshot%202024-03-24%20at%2022.45.34.png)





