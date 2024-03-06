import test, { Page, expect } from "@playwright/test";

test('create a new offer', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    await page.locator('#selectedFund').selectOption('Dementor Defense Dividends')
    await page.locator('#oneTimeInvestment').fill('10000')
    await page.locator('#years').fill('10')
    await page.locator('[data-test="create-offer"]').click()
    const yourData = page.locator('.your-data')
    await expect(yourData.getByText('Investment')).toBeVisible()
    const innerText = await yourData.getByText('Investment').innerText()
    const investmentValue = innerText.replace('Investment: ', '')
    expect(investmentValue).toBeTruthy()
})

test('create a new investment', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    await page.locator('#selectedFund').selectOption('Dementor Defense Dividends')
    await page.locator('#oneTimeInvestment').fill('10000')
    await page.locator('#years').fill('10')
    await page.locator('[data-test="create-offer"]').click()
    await page.locator('#customerName').fill('Severus')
    await page.getByRole('button', { name: 'Create Investment' }).click()
    const investment = page.locator('ul.investment-list').locator('li')
    await expect(investment).toBeVisible()
    await expect(investment.locator('h4')).toContainText('Severus')
})
test('reject an offer', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    await page.locator('#selectedFund').selectOption('Dementor Defense Dividends')
    await page.locator('#oneTimeInvestment').fill('10000')
    await page.locator('#years').fill('10')
    await page.locator('[data-test="create-offer"]').click()
    await page.getByRole('button', { name: 'Reject Offer' }).click()
    await expect(page.locator('.offer-detail')).not.toBeVisible()

    const option = await page.$eval('#selectedFund', sel => sel.options[sel.options.selectedIndex].textContent)
    expect(option).toEqual('Please select fund')
    await expect(page.locator('#oneTimeInvestment')).toHaveValue('')
    await expect(page.locator('#years')).toHaveValue('')
})

test('create 2 investments', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    for (let index = 0; index < 2; index++) {
        await createInvestment(page)
    }
    await expect(page.locator('ul.investment-list').locator('li')).toHaveCount(2)
})

async function createInvestment(page: Page) {
    await page.locator('#selectedFund').selectOption('Dementor Defense Dividends')
    await page.locator('#oneTimeInvestment').fill('10000')
    await page.locator('#years').fill('10')
    await page.locator('[data-test="create-offer"]').click()
    await page.locator('#customerName').fill('Severus')
    await page.getByRole('button', { name: 'Create Investment' }).click()
}
