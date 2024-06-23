const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '579fvv',
  e2e: {
    fixturesFolder: false,
    supportFile: false,
  },
})
