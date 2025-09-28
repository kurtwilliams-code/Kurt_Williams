import { test, expect } from "@playwright/test";
import { StringDecoder } from "string_decoder";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class timePage{
    
    constructor( page){
        this.page = page
        this.clickTime = page.locator('//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[4]/a/span')
        this.searchTimeEplyee = page.locator('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.orangehrm-card-container > form > div.oxd-form-row > div > div > div > div:nth-child(2) > div > div > input')
        this.clickView = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/form/div[2]/button')
        this.createTS = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[3]/div[2]/button')
        this.editTS = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[3]/div[2]/button[1]')
        this.searchProject = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[2]/table/tbody/tr[1]/td[1]/div/div[2]/div/div/input')
        this.fillTS = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[2]/table/tbody/tr[1]/td[3]/div/div[2]/input')
        this.saveTS = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[3]/div[2]/button[3]')
        this.selectActivity = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[2]/table/tbody/tr[1]/td[2]/div/div[2]/div/div/div[1]')
        this.submitTS = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[3]/div[2]/button[2]')
        this.verifyNewTS = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/form/div[2]/table/tbody/tr[1]/td[1]/span')

        
    
    }

    async getURLs(){

    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    }


    async selectTimeSheet(){

        await this.clickTime.click()
        await this.searchTimeEplyee.fill("Peter Mac Anderson")
        // await this.searchTimeEplyee.click()
        await this.page.waitForTimeout(500)

    const options1 = await this.page.locator('div[role="option"]').allTextContents()
    console.log('Dropdown options:', options1);

    const adminOption1 = this.page.getByRole('option', { name: 'Peter Mac Anderson' })
        await adminOption1.waitFor({ state: 'visible', timeout: 5000 })
        await adminOption1.click();
        await this.clickView.click()
    }

    async createTimesheet(){

        //await this.createTS.click()
        await this.editTS.click()

        await this.searchProject.fill("ACME")
        await this.page.waitForTimeout(500)

    const options2 = await this.page.locator('div[role="option"]').allTextContents()
    console.log('Dropdown options:', options2);

    const adminOption2 = this.page.getByRole('option', { name: 'ACME Ltd - ACME Ltd' })
        await adminOption2.waitFor({ state: 'visible', timeout: 5000 })
        await adminOption2.click();

        await this.fillTS.fill("7")
        await this.selectActivity.click()
        await this.page.waitForTimeout(500)

    const options3 = await this.page.locator('div[role="option"]').allTextContents()
    console.log('Dropdown options:', options3);

    const adminOption3 = this.page.getByRole('option', { name: 'Administration' })
        await adminOption3.waitFor({ state: 'visible', timeout: 5000 })
        await adminOption3.click();
        await this.saveTS.click()
        await this.submitTS.click()


    }

    async newTSverified(){

        const verifyTS = new this.verifyNewTS.innerText()
        await expect(this.verifyTS).toContain("ACME Ltd - ACME Ltd")

    }
    
    
}