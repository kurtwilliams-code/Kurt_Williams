import { test, expect } from "@playwright/test";
import { StringDecoder } from "string_decoder";

export class orangeLoginPage{
    
    constructor( page){
        this.page = page
        this.userName = page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input')
        this.passWord = page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input')
        this.clicklogin = page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button')
        this.clickToLogout = page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p')
        this.logOut = page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a')
        this.invalidError = page.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/div/div[1]/div[1]/p')
        
    
    }


    async getURL(){

    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    }


    async enterUsername(){

        await this.userName.fill("Admin")
        
    }

    async enterPassword(){

        await this.passWord.fill("admin123")
    }

    async login(){

        await this.clicklogin.click()
    }

    async logout(){
        await this.clickToLogout.click()
        await this.logOut.click()
    }

    async invalidUser(){

        await this.userName.fill("Invalid")
        await this.passWord.fill("user")
        await this.clicklogin.click()

    }
       
    async errormsg(){
        
        const error = await this.invalidError.innerText()
        
        await expect(this.invalidError).toHaveText("Invalid credentials")
    }
    
}