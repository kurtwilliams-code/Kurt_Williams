const {Given, When, Then, Before, After, setDefaultTimeout}= require('@cucumber/cucumber');
const {chromium, expect} = require('@playwright/test');
const Page = require("playwright");
const { orangeLoginPage } = require('../../tests-examples/pages/orangeLoginPage');
const { adminPage } = require('../../tests-examples/pages/adminPage');


setDefaultTimeout(10000);
 let page, browser, orangeLogin;

 Before(async function(){
 browser= await chromium.launch({headless:false});
 const context= await browser.newContext();
 page= await context.newPage();
 orangeLogin = new orangeLoginPage(page)
 adminUser = new adminPage(page)
 console.log("Before Hooks Executed")
 });

         Given('User is able to access orangeHMR', async function () {
           await orangeLogin.getURL()
         });


         Given('User logs in to orangeHRM', async function () {
           
           await orangeLogin.enterUsername()
           await orangeLogin.enterPassword()
           await orangeLogin.login()
         });


         When('User navigates to admin page', async function () {
           await adminUser.clickadminAddUser()
         });


         When('New user is added successfully', async function () {
           await adminUser.enterNewUserDetails()
           await page.waitForTimeout(2000);
         });


         When('New user search functionality is verified', async function () {
            await page.waitForTimeout(2000);
            await adminUser.searchFunctionality()
         });


         Then('New user details are identified', async function () {
           await page.waitForTimeout(2000);
            await adminUser.userverification()
         });


         When('New user is deleted', async function () {
            await page.waitForTimeout(2000);
            await adminUser.deleteuser()
         });


 After (async function(){
     await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p').click();
     await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a').click();
     await browser.close();
     console.log("After Hooks Executed")
 
  });