import { test, expect } from "@playwright/test";
test.beforeEach('set up context and open the page', async ({ page, context }) => {
    const consentCookie = {
        name: '__kwc_agreed',
        value: 'true',
        domain: 'www.kiwi.com',
        path: '/'
    }
    context.addCookies([consentCookie])
})
test('successful login with email', async ({ page }) => {
    await page.goto('https://www.kiwi.com/en');
    await page.locator('[data-test="TopNav-SingInButton"]').click()
    await page.locator('[data-test="MagicLogin-LoginViaEmail"]').click()
    await page.locator('[data-test="MagicLogin-Email"]').fill('testaccount@furbo.sk');
    await page.locator('[data-test="MagicLogin-Continue"]').click();
    await page.locator('[data-test="MagicLogin-PasswordInput"]').fill('iloveplaywright');
    await page.locator('[data-test="MagicLogin-Password"]').getByRole('button', { name: 'Sign in' }).click()
})

test('preffered currency is set based on cookie', async ({ page, context }) => {
    const currencyCookie = {
        name: 'preferred_currency',
        value: 'NOK',
        domain: 'www.kiwi.com',
        path: '/'
    }
    context.addCookies([currencyCookie])

    await page.goto('https://www.kiwi.com/en');
    await expect(page.locator('[data-test="TopNav-RegionalSettingsButton"]')).toContainText('NOK')
})