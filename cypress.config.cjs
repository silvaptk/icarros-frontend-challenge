const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {
      // Implement node event listeners here if needed
    },
    baseUrl: 'http://localhost:5173', // Adjust to your dev server port
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'src/**/*.cy.tsx', // Path to your component tests
  },
})
