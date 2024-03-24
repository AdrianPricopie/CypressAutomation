const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "xjd12e",
  reporter: 'cypress-mochawesome-reporter', //for html reports
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on); //for html esport
    },
    specPattern:'cypress/Integration/TestsOrangeHRM/*.js'
  },
});
