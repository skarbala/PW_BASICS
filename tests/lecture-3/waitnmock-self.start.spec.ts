import { test, expect } from "@playwright/test";
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
        //TODO:
        //pockajte na odpoved zo servera (je to graphQL request)
        //overte ze sa na stranke zobrazi letenka

        //PRO
        test('locations - wait for response', async ({ page }) => {
            await page.goto('/');
            const destination = 'Tokyo'
            await page.locator('[data-test="PlacePickerInput-destination"] [data-test="SearchField-input"]').fill(destination)
            //TODO - 
            //pockajte na odpoved zo servera
            //url skratte pomocou **
            //vyberte jednu z destinacii na stranke
            //overte ze destinacia sa prida do URL  
        })

        //BEAST MODE
        test('locations - save the response to file', async ({ page }) => {
            await page.goto('/search/results/vienna-austria/tokyo-japan');
            //GOAL: zapisat vysledok z response do samostatneho suboru vramci projektu
            //TODO: 
            //importovat kniznicu fs z node
            //zapisat file ako json do projektu
            //upravit file a vytvorit si z neho staticku odpoved
        })

        test('load data from file', async ({ page }) => {
            await page.goto('/search/results/vienna-austria/tokyo-japan');
            //GOAL: 
            //nahradit odpoved zo servera statickou odpovedou ktoru sme si ulozili v predoslom teste
            //nahradit odpoved zo servera tymto suborom
        })
    })
})