import { test, expect } from "@playwright/test";

//prejdeme si
//1. vytiahnutie opakujucich sa casti do beforeEach
//2. zabalenie testov do describe blocku
//3. pouzitie kontextu a nastavenie cookies pred otvorenim stranky
//4 nastavenie baseURL v ramci test use

test('search button is disabled when no origin selected', async ({ page }) => {
    await page.goto('https://www.kiwi.com/en/');
    await page.locator('[data-test="CookiesPopup-Accept"]').click();
    await page.locator('[data-test="PlacePickerInputPlace-close"]').click();
    await expect(page.locator('[data-test="LandingSearchButton"]')).toBeDisabled()
    //TODO overte text buttonu
})

test('number of passengers is set in url', async ({ page }) => {
    await page.goto('https://www.kiwi.com/en/');
    await page.locator('[data-test="CookiesPopup-Accept"]').click();
    await page.locator('[data-test="PassengersButton"]').click();
    //TODO: zrefaktorujte kliknutie na pridanie pasaziera
    await page.locator('[data-test="PassengersRow-adults"]').getByLabel('increment').click();
    await page.locator('[data-test="PassengersRow-adults"]').getByLabel('increment').click();
    await page.locator('[data-test="PassengersAndBagsFieldFooter-done"]').click()
    expect(page.url()).toContain('adults=3')
})

test('add anywhere as destination', async ({ page }) => {
    await page.goto('https://www.kiwi.com/en/');
    await page.locator('[data-test="CookiesPopup-Accept"]').click();
    await page.locator('[data-test="PlacePickerInput-destination"] [data-test="SearchField-input"]').click()
    await page.locator('[data-test="AnywhereRow"]').click()
    //TODO doplnte overenie ze anywhere je vybrane ako destination
    //TODO overte ze button na vyhladanie ma stale text Explore
})

