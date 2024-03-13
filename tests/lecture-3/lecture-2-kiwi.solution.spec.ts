import { test, expect } from "@playwright/test";

test.describe('Kiwi.com - home page', () => {
    test.use({ baseURL: 'https://www.kiwi.com' })

    test.beforeEach(async ({ page, context }) => {
        const constentCookie = {
            name: '__kwc_agreed',
            value: 'true',
            domain: 'www.kiwi.com',
            path: '/'
        }
        context.addCookies([constentCookie])
        await page.goto('/en');
    })
    test('search button is disabled when no origin selected', async ({ page }) => {
        await page.locator('[data-test="PlacePickerInputPlace-close"]').click();
        const searchButton = page.locator('[data-test="LandingSearchButton"]');
        await expect(searchButton).toBeDisabled()
        await expect(searchButton).toHaveText('Explore')
    })

    test('number of passengers is set in url', async ({ page }) => {
        await page.locator('[data-test="PassengersButton"]').click();
        const addAdultPassenger = page.locator('[data-test="PassengersRow-adults"]').getByLabel('increment');
        for (let index = 0; index < 2; index++) {
            await addAdultPassenger.click();
        }
        await page.locator('[data-test="PassengersAndBagsFieldFooter-done"]').click()
        expect(page.url()).toContain('adults=3')
    })

    test('add anywhere as destination', async ({ page }) => {
        await page.locator('[data-test="PlacePickerInput-destination"] [data-test="SearchField-input"]').click()
        await page.locator('[data-test="AnywhereRow"]').click()
        await expect(page.locator('[data-test="PlacePickerInput-destination"]')
            .locator('[data-test="PlacePickerInputPlace"]')).toHaveText('Anywhere')
    })

})