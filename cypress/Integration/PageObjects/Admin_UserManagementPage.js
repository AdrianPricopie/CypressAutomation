class AdminPage {

    ClickAddUser(){
        cy.get('button[class="oxd-button oxd-button--medium oxd-button--secondary"]').click()
    }
    SelectUserRole(user){ // ESS OR Admin
        cy.get('div[class="oxd-select-text-input"]').eq(0).click()
        cy.get('.oxd-select-dropdown').contains(user).click()
    }
    SelectStatus(status){ // Enabled or disabled
        cy.get('div[class="oxd-select-text-input"]').eq(1).click()
        cy.contains(status).click()
    }
    SetEmployeName(name){
        cy.get('.oxd-autocomplete-wrapper').type(name)
        cy.get('.oxd-autocomplete-dropdown')
        cy.contains(name).click()
    }
    SetUserName(name){
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(name)
    }
    SetPassword(pass){
        cy.get('input[type="password"]').eq(0).type(pass)
    }
    ConfirmPassword(pass){
        cy.get('input[type="password"]').eq(1).type(pass)
    }
    clickSaveButton(){
        cy.get('.oxd-button--secondary').click()
    }
    VerifyAccount(name){
        let nameExists=false;
        cy.get('.oxd-table-card').each(($el)=>
        {
            const text = $el.text()
            if(text.includes(name)){
                nameExists= true ;
            }
        }).then(() => {
            // Verificăm dacă numele există și este egal cu numele specificat
            expect(nameExists).to.be.true;
        });

    }
    VerifyAnExistingAccount(){
        cy.get('.oxd-input-group > .oxd-text').should('have.text','Already exists')
    }
    DeleteAccountForCleanUP(name){
        cy.get('.oxd-table-card').each(($el) => {
            const text = $el.text();
            if (text.includes(name)) {
                // Găsește butonul de ștergere și execută operația de ștergere a contului
                cy.wrap($el).find('button[type="button"]').eq(0).click({force: true}); // presupunând că ai un buton de ștergere cu clasa '.delete-button'
            }
        })
        cy.get('.oxd-button--label-danger').click()
    }
    UsernameInputSystemUser(name){
        cy.get("div[class='oxd-input-group oxd-input-field-bottom-space']").find('input[class="oxd-input oxd-input--active"]').type(name)
    }
    ClickSearchButton(){
        cy.get('.oxd-form-actions > .oxd-button--secondary').click()

    }
         VerifyAccountSystemUser(name) {
             let nameExists=false;
             cy.wait(1000)
             cy.get('.oxd-table-body > :nth-child(n) > .oxd-table-row > :nth-child(3)').each(($el)=>
             {

                 const text = $el.text()
                
                 if(text.includes(name)){
                     nameExists= true ;
                 }
             }).then(() => {
                 // Verificăm dacă numele există și este egal cu numele specificat
                 expect(nameExists).to.be.true;
             });
            }
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
}
export default new AdminPage();