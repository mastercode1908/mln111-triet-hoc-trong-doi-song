const { defineConfig } = require('@playwright/test');
module.exports=defineConfig({
  testDir:'./tests/browser',timeout:30000,workers:1,reporter:'list',
  use:{baseURL:'http://127.0.0.1:3187',browserName:'chromium',channel:'msedge',headless:true,screenshot:'only-on-failure'},
  webServer:{command:'npm run build && node server.js',url:'http://127.0.0.1:3187/api/health',reuseExistingServer:false,timeout:30000,env:{PORT:'3187',GEMINI_API_KEY:''}},
});
