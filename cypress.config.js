const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 1000,
    viewportWidth: 1280,
    retries: {
      runMode: 1,
      openMode: 1
    },
    env : {
      baseUrl : "https://demo.nopcommerce.com",
      preserveUserLoggedIn : '.Nop.Authentication'
    },
  },
});
