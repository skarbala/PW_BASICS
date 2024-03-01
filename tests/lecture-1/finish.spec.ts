import test, { expect } from "@playwright/test";
test.describe('Potter Quotes', () => {

    test.beforeEach('open page', async ({ page }) => {
        await page.goto('http://localhost:8080/#/quotes')
    })

    test('add quote after clicking on a button', async ({ page }) => {
        const addQuoteButton = page.locator('[data-test="get-quote"]')
        await addQuoteButton.click()
        await expect(page.locator('ul.quote-list >li')).toBeVisible()
    })

    test('add 10 random quotes', async ({ page }) => {
        const addQuoteButton = page.locator('[data-test="get-quote"]')
        for (let index = 0; index < 5; index++) {
            await addQuoteButton.click()
        }
        await expect(page.locator('ul.quote-list >li')).toHaveCount(5)
        const quotes = await page.locator('ul.quote-list >li').all()
        for (const quote of quotes) {
            console.log(await quote.innerText())
        }
    })

    test('remove quote is disabled on page open', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Remove Quote' })).toBeDisabled()
    })
})