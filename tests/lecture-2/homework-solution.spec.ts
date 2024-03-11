import test, { type Page, expect } from "@playwright/test";
import offers from '../../offers.json'
test('create a new offer', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    const offerData = {
        fund: 'Dementor Defense Dividends',
        investment: '10000',
        years: '10'
    }
    await fillOfferData(page, offerData)
    await page.locator('[data-test="create-offer"]').click()
    const yourData = page.locator('.your-data')
    await expect(yourData.getByText('Investment')).toBeVisible()
    const innerText = await yourData.getByText('Investment').innerText()
    const investmentValue = innerText.replace('Investment: ', '')
    expect(investmentValue).toBeTruthy()
})

test('create a new investment', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    const name = 'Severus'
    const offerData = {
        fund: 'Dementor Defense Dividends',
        investment: '10000',
        years: '10'
    }
    await fillOfferData(page, offerData)
    await page.locator('[data-test="create-offer"]').click()
    await page.locator('#customerName').fill(name)
    await page.getByRole('button', { name: 'Create Investment' }).click()
    const investment = page.locator('ul.investment-list').locator('li')
    await expect(investment).toBeVisible()
    await expect(investment.locator('h4')).toContainText(name)
})
test('reject an offer', async ({ page }) => {
    await page.goto('http://localhost:8080/#/gringottsBank')
    const offerData = {
        fund: 'Dementor Defense Dividends',
        investment: '10000',
        years: '10'
    }
    await fillOfferData(page, offerData)

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
    for (const offer of offers) {
        await fillOfferData(page, offer)
        await page.locator('[data-test="create-offer"]').click()
        await page.locator('#customerName').fill('Severus')
        await page.getByRole('button', { name: 'Create Investment' }).click()
    }
    await expect(page.locator('ul.investment-list').locator('li')).toHaveCount(offers.length)
    //show the filter
    await expect(page.locator('ul.investment-list').locator('li').filter({ hasText: offers[0].fund })).toBeVisible()
})

async function fillOfferData(page: Page, offerData) {
    await page.locator('#selectedFund').selectOption(offerData.fund)
    await page.locator('#oneTimeInvestment').fill(offerData.investment)
    await page.locator('#years').fill(offerData.years)
}
