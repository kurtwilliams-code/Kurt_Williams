const {Given, When, Then, Before, After, setDefaultTimeout}= require('@cucumber/cucumber');
const {chromium, expect} = require('@playwright/test');
const Page = require("playwright");
const { orangeLoginPage } = require('../../tests-examples/pages/orangeLoginPage');


setDefaultTimeout(20000);
 let page, browser, orangeLogin;

 Before(async function(){
 browser= await chromium.launch({headless:false});
 const context= await browser.newContext();
 page= await context.newPage();
 orangeLogin = new orangeLoginPage(page)
 console.log("Before Hooks Executed")
 });


Given('User is able to access orangeHMR', async function () {
           

      await orangeLogin.getURL()
        
         });

    Given('User enter the username as "Admin"', async function (){
      
      await orangeLogin.enterUsername()

      
         });


         Given('User enter the password as "admin123"', async function (){

          await orangeLogin.enterPassword()
          
         });


         When('User click on the login button', async function () {
          
          await orangeLogin.login()

         });


         Then('Login should be success', async function () {
          
           await expect(page).toHaveTitle("OrangeHRM")
         });

         When('User logs out', async function () {
          
          await orangeLogin.logout()
        
         });

         When('User enters invalid credentials', async function () {
          
          await orangeLogin.invalidUser()
         });

         Then('Error message verified successfully', async function () {

          const invalidmessgae = page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/p')
          await expect(invalidmessgae).toHaveText("Invalid credentials")
          console.log(invalidmessgae)
         
         });

         When('User logs back in', async function () {
        
          await orangeLogin.enterUsername()
          await orangeLogin.enterPassword()
          await orangeLogin.login()

         });


    After (async function(){
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p').click();
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a').click();
    await browser.close();
    console.log("After Hooks Executed")

 });




