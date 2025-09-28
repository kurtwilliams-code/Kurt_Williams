import { test, expect } from "@playwright/test";
import { StringDecoder } from "string_decoder";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class adminPage{
    
    constructor( page){
        this.page = page
        this.clickAdmin = page.locator('//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a/span')
        this.addUser = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button')
        this.userRole = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div/div[1]')
        this.setStatus = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[3]/div/div[2]/div/div/div[1]')
        this.clickSave = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/button[2]')
        this.employeeName = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div/input')
        this.userName = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input')
        this.password1 = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/input')
        this.confirmpassword = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/input')
        this.searchUsername = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input')
        this.clickSearch = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]')
        this.expectedUser = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div/div/div[2]/div')
        this.deleteUser = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div/div/div[6]/div/button[1]')
        this.confirmDelete = page.locator('//*[@id="app"]/div[3]/div/div/div/div[3]/button[2]')
        
    
    }

    async getURL(){

    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    }

    async clickadminAddUser(){

        await this.clickAdmin.click()
        await this.addUser.click()
    }
    
    async enterNewUserDetails(){
    
    await this.userRole.click();
    await this.page.waitForTimeout(500)

    const options = await this.page.locator('div[role="option"]').allTextContents()
    console.log('Dropdown options:', options);

    const adminOption = this.page.getByRole('option', { name: 'Admin' })
    await adminOption.waitFor({ state: 'visible', timeout: 5000 })
    await adminOption.click();

    await this.setStatus.click();
    await this.page.waitForTimeout(500);
    const enabledOption = this.page.getByRole('option', { name: 'Enabled' })
    await enabledOption.waitFor({ state: 'visible', timeout: 5000 });
    await enabledOption.click();

    const jsonFilePath = path.join(__dirname, "testData.json");
    const jsonTestData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"))

    for(const jsonObj of jsonTestData){
        await this.employeeName.fill(jsonObj.employeeName)
        const selectname = this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div[2]/div/div[2]/div[1]/span')
        selectname.waitFor({ state: 'visible', timeout: 5000 });
        await selectname.click();
        await this.userName.fill(jsonObj.userName)
        await this.password1.fill(jsonObj.password1)
        await this.confirmpassword.fill(jsonObj.confirmpassword)

        await this.clickSave.click()

    }

}
    

    async searchFunctionality(){

        await this.searchUsername.fill("petermac")
        await this.clickSearch.click()
        
}
   async userverification(){
     const expectedUser = "petermac";
   
        console.log(expectedUser);
        await expect(expectedUser).toContain("petermac");
   }

    async deleteuser(username = "petermac") {
    
    const userRow = this.page.getByRole('row', { name: new RegExp(username, 'i') });
    const deleteButton = userRow.getByRole('button').first();
     await deleteButton.click();
     await this.confirmDelete.click();
    
    }
}