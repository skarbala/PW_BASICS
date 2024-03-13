import { test, expect } from '@playwright/test'

// PotterAPI documentation https://documenter.getpostman.com/view/6199862/SzYewFs9

test.describe('Spells API', () => {
    test('returns list of spells', async ({ request }) => {
        const response = await request.get('http://localhost:3000/spells')
        expect(response.status()).toEqual(200)
        const responseBody = await response.json()
        const spells: Spell[] = responseBody
        expect(responseBody.length).toBeGreaterThan(0)
        for (const spell of spells) {
            expect(spell.type).toBeTruthy()
        }
    })

    test('returns a specific spell', async ({ request }) => {
        const response = await request.get('http://localhost:3000/spells/5b74ebd5fb6fc0739646754c')
        expect(response.status()).toEqual(200)
        const responseBody = await response.json()
        console.log(responseBody)
        expect(responseBody.effect).toEqual('opens objects')
        // check exact spell information (effect, type, isUnforgivable)

    })

    test('adds new spell', async ({ request, page }) => {
        await request.get('http://localhost:3000/spells/actions/reset')
        const newSpell: Spell = {
            spell: "Soplik",
            effect: "sneezing forever",
            type: SpellType.Charm,
            isUnforgivable: true
        }
        const response = await request.post('http://localhost:3000/spells', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newSpell)
        })
        const responseBody = await response.json()
        newSpell.id = responseBody.spell.id

        await page.goto('http://localhost:8080/#/spelleology')
        await page.locator('ul.spells').locator('li').filter({ hasText: newSpell.effect }).click()
    })
})

class Spell {
    spell: string
    id?: string;
    effect: string;
    type: SpellType;
    isUnforgivable: boolean
}

enum SpellType {
    Charm = "Charm",
    Curse = "Curse",
    Spell = "Spell",
    Enchantment = "Enchantment",
    Hex = "Hex",
    Jynx = "Jynx"
}