import { test, expect } from "@playwright/test";

test.describe('Sorting hat', () => {
    test('wait for the response from server', async ({ page }) => {
        //TODO: pockat na odpoved zo servera
        //vytiahnut si data z odpovede
        // overit data na stranke
        await page.goto('http://localhost:8080/#/sortingHat')
        await page.getByRole('button', { name: 'Sort me' }).click()
    })

    test('mock the response with JSON', async ({ page }) => {
        //vytvorit samostatny fake response json
        await page.goto('http://localhost:8080/#/sortingHat')
        await page.getByRole('button', { name: 'Sort me' }).click()
        //todo overit text fake spravy
    })

    test('save the response to file', async ({ page }) => {
        //TODO: importovat kniznicu fs z node
        //zapisat file ako json do projektu
        //ukazat identation a error handling
        await page.goto('http://localhost:8080/#/sortingHat')
        await page.getByRole('button', { name: 'Sort me' }).click()
    })

    test('load data from file', async ({ page }) => {
        //TODO: import the file
        //use the file in route fulfill
        await page.goto('http://localhost:8080/#/sortingHat')
        await page.getByRole('button', { name: 'Sort me' }).click()
    })
    test('mock an error', async ({ page }) => {
        //TODO: simulovat response 500
        await page.goto('http://localhost:8080/#/sortingHat')
        await page.getByRole('button', { name: 'Sort me' }).click()
    })
});