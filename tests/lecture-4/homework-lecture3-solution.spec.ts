import { test, expect } from '@playwright/test'

test.describe('Get Quote', () => {
    test('replace backend response with own quote', async ({ page }) => {
        const url = 'http://localhost:3000/quote'
        const response = {
            quote: "any quote of this magnificent wizard",
            author: "Andrej Danko"
        }
        await page.route(url, route => route.fulfill({
            body: JSON.stringify(response)
        }))

        await page.goto('http://localhost:8080/#/quotes')
        await page.getByRole('button', { name: "Get Quote" }).click()
        await expect(page.locator('ul.quote-list').locator('li').locator('p').filter({ hasText: response.quote })).toBeVisible()
        await expect(page.locator('ul.quote-list').locator('li').locator('p.author')).toHaveText(response.author)
    })
});

test.describe('Spelleology', () => {
    test('replace backend response with empty spells', async ({ page }) => {
        await page.route('http://localhost:3000/spells', route => route.fulfill({
            body: '[]'
        }))
        await page.goto('http://localhost:8080/#/spelleology')
        await expect(page.getByText('Mischief managed')).toBeVisible()
    })
})

test.describe('Kiwi.com', () => {
    test.use({ baseURL: 'https://www.kiwi.com/en' })
    test.beforeEach('set up context and open the page', async ({ context }) => {
        const cookies = [{
            name: '__kwc_agreed',
            value: 'true',
            domain: 'www.kiwi.com',
            path: '/'
        }]
        context.addCookies(cookies)
    })
    test('replace backend response with empty flights', async ({ page }) => {
        const url = 'https://api.skypicker.com/umbrella/v2/graphql?featureName=SearchReturnItinerariesQuery'
        await page.route(url, route => route.fulfill({
            body: '[]'
        }))
        await page.goto('/search/results/vienna-austria/barcelona-spain')
    })
    test('replace backend response with status code 500', async ({ page }) => {
        const url = 'https://api.skypicker.com/umbrella/v2/graphql?featureName=SearchReturnItinerariesQuery'
        await page.route(url, route => route.fulfill({
            status: 500
        }))
        await page.goto('/search/results/vienna-austria/barcelona-spain')
    })
})

