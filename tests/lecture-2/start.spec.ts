import { test, expect, Page } from '@playwright/test'
test.use({ storageState: 'storage.json' })

test('create 2 investments', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    for (let index = 0; index < 1; index++) {
        await createInvestment(page)
    }
    // await expect(page.locator('ul.investment-list').locator('li')).toHaveCount()
    await page.context().storageState({ path: 'storage.json' })
})




async function createInvestment(page: Page) {
    await page.locator('#selectedFund').selectOption('Dementor Defense Dividends')
    await page.locator('#oneTimeInvestment').fill('10000')
    await page.locator('#years').fill('10')
    await page.locator('[data-test="create-offer"]').click()
    await page.locator('#customerName').fill('Severus')
    await page.getByRole('button', { name: 'Create Investment' }).click()
}