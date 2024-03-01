import { test, expect } from "@playwright/test";
import { config } from "process";
test.use
test('get login token and set cookies', async ({ page, context, request }) => {
    const response = await request.post('https://auth.skypicker.com/v1/user.login', {
        headers: {
            Authorization: 'Basic NTQzM2VjY2NhZmY2Nzo='
        },
        data: {
            brand: "kiwicom",
            login: "testaccount@furbo.sk",
            password: "starterpack4"
        }

    })
    const json = await response.json()
    expect(json.token).toBeTruthy()

    const cookies = [{
        name: 'ua_session_token',
        value: json.token,
        domain: 'www.kiwi.com',
        path: '/'
    }, {
        name: '__kwc_agreed',
        value: 'true',
        domain: 'www.kiwi.com',
        path: '/'
    }]
    await context.addCookies(cookies)
    await page.goto('https://www.kiwi.com/en')
})

test('process env', async ({ baseURL }, testInfo) => {
    console.log(testInfo.project.use.baseURL)

});