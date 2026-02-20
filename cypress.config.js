const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,
  projectId: '579fvv',
  e2e: {
    fixturesFolder: false,
    supportFile: false,
  },
})
