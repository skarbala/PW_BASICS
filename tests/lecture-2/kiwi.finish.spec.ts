import { test, expect } from "@playwright/test";

test.describe('Kiwi.com - home page', () => {
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
        await expect(page.locator('[data-test="LandingSearchButton"]')).toBeDisabled()
        //TODO overte text buttonu
    })

    test('number of passengers is set in url', async ({ page }) => {
        await page.locator('[data-test="PassengersButton"]').click();
        //TODO: zrefaktorujte kliknutie na pridanie pasaziera
        await page.locator('[data-test="PassengersRow-adults"]').getByLabel('increment').click();
        await page.locator('[data-test="PassengersRow-adults"]').getByLabel('increment').click();
        await page.locator('[data-test="PassengersAndBagsFieldFooter-done"]').click()
        expect(page.url()).toContain('adults=3')
    })

    test('add anywhere as destination', async ({ page }) => {
        await page.locator('[data-test="PlacePickerInput-destination"] [data-test="SearchField-input"]').click()
        await page.locator('[data-test="AnywhereRow"]').click()
        //TODO doplnte overenie ze anywhere je vybrane ako destination
        //TODO overte ze button na vyhladanie ma stale text Explore
    })
})

