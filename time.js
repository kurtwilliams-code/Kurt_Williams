const {Given, When, Then, Before, After, setDefaultTimeout}= require('@cucumber/cucumber');
const {chromium, expect} = require('@playwright/test');
const Page = require("playwright");
const { orangeLoginPage } = require('../../tests-examples/pages/orangeLoginPage');
const { timePage } = require('../../tests-examples/pages/timePage')


setDefaultTimeout(30000);
 let page, browser, orangeLogin;

 Before(async function(){
 browser= await chromium.launch({headless:false});
 const context= await browser.newContext();
 page= await context.newPage();
 orangeLogin = new orangeLoginPage(page)
 timeSheet1 = new timePage(page)
 console.log("Before Hooks Executed")
 });

       
         Given('User is able to access orangeHMR', async function () {
            await timeSheet1.getURLs()
         });
       
       
         Given('User logs in to orangeHRM', async function () {
           await orangeLogin.enterUsername()
           await orangeLogin.enterPassword()
           await orangeLogin.login()
         });
       
       
         When('User navigates to time, searches for employee', async function () {
           await timeSheet1.selectTimeSheet()
         });


         When('User creates timetsheet and edits it', async function () {
           await timeSheet1.createTimesheet()
         });



         Then('User views newly created timesheet', async function () {
           await timeSheet1.newTSverified()
         });


  After (async function(){
     await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p').click();
     await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a').click();
     await browser.close();
     console.log("After Hooks Executed")
 
  });
 