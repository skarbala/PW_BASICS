import { test, expect } from "@playwright/test";
import fs from 'node:fs'
//BASIC
test.describe('Kiwi.com', () => {
    test.use({ baseURL: 'https://www.kiwi.com/en' })
    test.beforeEach('set up context and open the page', async ({ page, context }) => {
        const cookies = [{
            name: '__kwc_agreed',
            value: 'true',
            domain: 'www.kiwi.com',
            path: '/'
        }]
        context.addCookies(cookies)
    })
    //BASIC
    test('successful login with email', async ({ page }) => {
        await page.goto('/');
        await page.locator('[data-test="TopNav-SingInButton"]').click()
        await page.locator('[data-test="MagicLogin-LoginViaEmail"]').click()
        await page.locator('[data-test="MagicLogin-Email"]').fill('testaccount@furbo.sk');
        await page.locator('[data-test="MagicLogin-Continue"]').click();
        //pockajte na response ktory pride po zadani emailu a kliknuti na continue
        await page.locator('[data-test="MagicLogin-PasswordInput"]').fill('iloveplaywright');
        await page.locator('[data-test="MagicLogin-Password"]').getByRole('button', { name: 'Sign in' }).click()
        //pockajte na response ktory pride po zadani hesla
        //TODO: vymyslite overenie na to ze pouzivatel je prihlaseny
        //(hint (skuste ))
    })

    //MEDIUM
    test('wait for results on result page', async ({ page }) => {
        await page.goto('/search/results/vienna-austria/tokyo-japan');
        await page.waitForResponse('https://api.skypicker.com/umbrella/v2/graphql?featureName=SearchReturnItinerariesQuery')
        const resultWrapper = page.locator('[data-test="ResultCardWrapper"]').first()
        await expect(resultWrapper).toBeVisible()
        await expect(resultWrapper.getByRole('link', { name: 'Select' })).toBeVisible()
        await expect(resultWrapper.locator("[data-test='ResultCardPrice']")).toContainText('€')
    })
    //PRO
    test('locations - wait for response', async ({ page }) => {
        await page.goto('/');
        const destination = 'Tokyo'
        await page.locator('[data-test="PlacePickerInput-destination"] [data-test="SearchField-input"]').fill(destination)
        //add wait for graphQL response
        await page.waitForResponse('https://api.skypicker.com/umbrella/v2/graphql?featureName=UmbrellaPlacesQuery**')
        await page.locator('[data-test="PlacepickerModalOpened-destination"]')
            .locator('[data-test="PlacePickerRow-city"]')
            .filter({ hasText: destination }).click()
        //TODO - pick one of returned destinations
        //assert that the destination is added to the query parameters of the URL       
    })

    //BEAST MODE
    test('locations - save the response to file', async ({ page }) => {
        await page.goto('/search/results/vienna-austria/tokyo-japan');
        const response = await page.waitForResponse('https://api.skypicker.com/umbrella/v2/graphql?featureName=SearchReturnItinerariesQuery')
        const responseBody = await response.json()
        fs.writeFile('flights.json', JSON.stringify(responseBody, null, 1), (error) => { console.log(error) })
        //GOAL: zapisat vysledok z response do samostatneho suboru vramci projektu
        //TODO: 
        //importovat kniznicu fs z node
        //zapisat file ako json do projektu
        //upravit file a vytvorit si z neho staticku odpoved
    })

    test('load data from file', async ({ page }) => {
        await page.route('https://api.skypicker.com/umbrella/v2/graphql?featureName=SearchReturnItinerariesQuery', route => route.fulfill({
            body: JSON.stringify(require('../../flights.json'))
        }
        ))
        await page.goto('/search/results/vienna-austria/tokyo-japan');
        //GOAL: 
        //import the file
        //nahradit odpoved zo servera tymto suborom
    })

})