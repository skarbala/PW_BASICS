import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test.describe('Kiwi.com result page - exceptions', () => {

  test.use({ baseURL: 'https://www.kiwi.com/en' })
  test.beforeEach('set cookies', async ({ context }) => {
    const cookies = [{
      name: '__kwc_agreed',
      value: 'true',
      domain: 'www.kiwi.com',
      path: '/'
    }]
    context.addCookies(cookies)

  })
  test('no results on result page', async ({ page }) => {
    await page.route('**/graphql?featureName=SearchReturnItinerariesQuery', async route => {
      await route.fulfill({
        body: '[]'
      });
    });
    await page.goto('/search/results/vienna-austria/tokyo-japan');
    await expect(page.getByText('Sorry, we couldn’t find your trip. Try different dates?Try selecting nearby')).toBeVisible()

  });

  test('server returns an error', async ({ page }) => {
    await page.route('**/graphql?featureName=SearchReturnItinerariesQuery', async route => {
      await route.fulfill({
        status: 500
      });
    });
    await page.goto('/search/results/vienna-austria/tokyo-japan');
    const alert = page.locator('[data-test="Alert"]')
    await expect(alert).toBeVisible()
    await expect(alert).toHaveText("Sorry, we're having some issues. Try reloading the page.")
  });
})
