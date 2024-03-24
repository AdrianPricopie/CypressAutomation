# Automated Testing Project for OrangeHRM Website :computer:
Welcome to the documentation for the automated testing project designed for the OrangeHRM website. This project leverages Cypress and the POM framework to implement a robust suite of tests, ensuring the functionality and reliability.
## Table of Contents

1. [Introduction/Tools and version](#introduction-notebook)
2. [Project Structure](#project-structure)
3. [Features Under Testing](#feature-under-the-tests)
    - [Login Functionality Testing](#feature-under-the-tests)
    - [Search Functionality Testing](#search-functionality-testing)
4. [Getting-Started](#getting-started--pushpin)
6. [Usage](#usage)
7. [Reports](#reports)
8. [Conclusion](#conclusions)
o
# Introduction :notebook:
 
This project aims to implement automated tests for the OrangeHRM opensource website using Cypress and POM(Page object oriented) framework. 
The primary objectives include simulating user interactions and login in account ,add users,delete users,search users.

- Language:**JavaScript**
- Editor code:**VsCode**
- Library:**Cypress,cypress-mochawesome-reporter**;


OrangeHRM is a Human Resources Management (HRM) system that provides software solutions for efficiently managing HR departments in businesses and organizations.
OrangeHRM offers various functionalities, including employee data management, recruitment and selection, employee training, performance management, leave and absence management, report generation, as well as other HR-related aspects.
OrangeHRM is available as open-source software or as cloud-based and on-premise solutions, catering to the diverse needs of businesses of different sizes and industries. The OrangeHRM website provides more information about their 
products and services, including demos, user guides, technical support, and other useful resources for clients and users.

- [Documentation](https://www.orangehrm.com/assets/Files/Live-3-0User-Guide-For-Administrative-Users-v2.pdf)

- [Website](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login)

# Project Structure 

![Structure](https://github.com/AdrianPricopie/CypressAutomation/blob/main/Screenshot%202024-03-24%20at%2019.40.12.png)

- **cypress/**: This is the main directory of the Cypress project.
- **cypress/fixtures/**: Static test data, such as JSON files, is stored here.
- **cypress/integration/**: All spec files for tests are stored here. Inside this directory, each subdirectory corresponds to a specific testing module.
- **cypress/support/**: Custom Cypress commands and other support files are defined here.
- **cypress/integration/PageObjects/**: Classes representing page objects for different pages of the OrangeHRM website are stored here.
- **cypress/integration/TestsOrangeHRM/**: All the tests are stored here.
- **cypress/reports/**: This directory is where Cypress generates test reports.


### Test Scenarios for Login Functionality:

1. **Login with Valid Credentials:**
   - Description: User enters valid username and password and clicks the login button.
   - Actions:
     1. Enters a valid username.
     2. Enters a valid password.
     3. Clicks the login button.
   - Expected:
     - User is redirected to the dashboard.

2. **Login with Invalid Credentials:**
   - Description: User enters invalid username and password and clicks the login button.
   - Actions:
     1. Enters an invalid username.
     2. Enters an invalid password.
     3. Clicks the login button.
   - Expected:
     - An error message indicating invalid credentials is displayed.

3. **Login Without Entering Password:**
   - Description: User enters only the username and clicks the login button.
   - Actions:
     1. Enters a valid username.
     2. Leaves the password field empty.
     3. Clicks the login button.
   - Expected:
     - An error message indicating password is required is displayed.

4. **Login Without Entering Username:**
   - Description: User enters only the password and clicks the login button.
   - Actions:
     1. Leaves the username field empty.
     2. Enters a valid password.
     3. Clicks the login button.
   - Expected:
     - An error message indicating username is required is displayed.

5. **Login Without Completing Mandatory Fields:**
   - Description: User attempts to login without completing any of the mandatory fields (username and password).
   - Actions:
     1. Leaves both mandatory fields empty.
     2. Clicks the login button.
   - Expected:
     - Error messages for both fields indicating they are required are displayed.
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



