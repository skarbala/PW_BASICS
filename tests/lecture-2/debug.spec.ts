import { test, expect } from "@playwright/test";

test('debug in trace viewer will show you more info about test execution', async ({ page }) => {
    //v trace viewer budes vidiet cely chod testu, ako vyzerala sietova aktivita a 
    //vies si aj vybrat casove rozmedzie a odfiltrovat akcie a sietovu aktivitu
    await page.goto('http://localhost:8080/#/sortingHat')
    await page.locator('[data-test="sort-button"]').click()
    await expect(page.getByRole('heading', { name: 'Let me think...' })).toBeVisible()
})

test('debug using breakpoints will allow you to crawl the test explore the returned values', async ({ page }) => {
    //pri debugovani vidis aj oznaceny element, ak je selektor spravny, element je oznaceny farebne
    await page.goto('https://www.kiwi.com/en/');
    await page.locator('[data-test="CookiesPopup-Accept"]').click();
    await page.locator('[data-test="bookingCheckbox"] div').first().click();
    await page.locator('[data-test="PlacePickerInput-destination"]')
        .locator('[data-test="SearchField-input"]')
        .fill('bratislava');
    await page.getByRole('button', { name: 'BTS Bratislava Airport 8 km' }).click();
    const landingButton = page.locator('[data-test="LandingSearchButton"]')
    await landingButton.click();
    expect(page.url()).toContain('kiwi')
    //TODO: pridaj overenie na zobrazenie letenky
})

//zdebuguj test, zisti kde spadol a preco
//nezabudni vymazat anotaciu fixme :)
test.fixme('Bruce, why do we fall?', async ({ page }) => {
    await page.goto('https://www.kiwi.com/en/?origin=vienna-austria&destination=barcelona-spain')
    await page.locator('[data-test="CookiesPopup-Accept"]').click();
    await page.locator('[data-test="TopNav-RegionalSettingsButton"]').click();
    await page.locator('[data-test="LanguageSelect"]').selectOption('it');
    await page.locator('[data-test="SubmitRegionalSettingsButtons"]').click();
    //todo zastav si test a zisti aka je aktualna url a ci je spravna, potom oprav overenie
    expect(page.url()).toContain('/its')
})

