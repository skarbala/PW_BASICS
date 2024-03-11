// wait for response
// replace response
// modify response
// simulate server error

import { test, expect } from "@playwright/test";
import fs from 'node:fs';
import sortingResponse from '../../sortingResponse.json'

test.describe('Sorting hat', () => {
    test.beforeEach('open the page', async ({ page }) => {
        await page.goto('http://localhost:8080/#/sortingHat')

    })
    test('wait for the response from server', async ({ page }) => {
        //TODO: pockat na odpoved zo servera
        //vytiahnut si data z odpovede
        // overit data na stranke
        await page.getByRole('button', { name: 'Sort me' }).click()
        const response = await page.waitForResponse('**/sortingHat')
        const responseBody = await response.json()
        await expect(page.locator('[data-test="result-message"]')).toHaveText(responseBody.sortingHatSays)
        await expect(page.locator('[data-test="house-result"]')).toHaveText(responseBody.house)
    })

    test('mock the response with JSON stringify', async ({ page }) => {
        //vytvorit samostatny fake response json
        const fakeResponse = {
            sortingHatSays: 'Serus',
            house: 'Samorin'
        }
        page.route('**/sortingHat', route => {
            route.fulfill({
                body: JSON.stringify(fakeResponse)
            })
        })
        await page.getByRole('button', { name: 'Sort me' }).click()
        await expect(page.locator('[data-test="result-message"]')).toHaveText(fakeResponse.sortingHatSays)
        await expect(page.locator('[data-test="house-result"]')).toHaveText(fakeResponse.house)
    })

    test('save the response to file', async ({ page }) => {
        //TODO: importovat kniznicu fs z node
        //zapisat file ako json do projektu
        //ukazat identation a error handling
        await page.getByRole('button', { name: 'Sort me' }).click()
        const response = await page.waitForResponse('**/sortingHat')
        const responseBody = await response.json()
        fs.writeFile('sortingResponse.json', JSON.stringify(responseBody, null, 1), (error) => { console.log(error) })

    })

    test('load data from file', async ({ page }) => {
        //TODO: import the file
        //use the file in route fulfill
        page.route('**/sortingHat', route => {
            route.fulfill({
                body: JSON.stringify(sortingResponse)
            })
        })
        await page.getByRole('button', { name: 'Sort me' }).click()
        await expect(page.locator('[data-test="result-message"]')).toHaveText(sortingResponse.sortingHatSays)
        await expect(page.locator('[data-test="house-result"]')).toHaveText(sortingResponse.house)
    })
    test('mock an error', async ({ page }) => {
        await page.route('**/sortingHat', async route => {
            await route.fulfill({ status: 500 })
        })
        await page.getByRole('button', { name: 'Sort me' }).click()
    })
});