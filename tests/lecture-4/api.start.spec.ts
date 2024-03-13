import { test, expect } from '@playwright/test'

// PotterAPI documentation https://documenter.getpostman.com/view/6199862/SzYewFs9

test.describe('Spells API', () => {
    test('returns list of spells', async () => {
        //TODO zavolajte get request na vsetky kuzla
        //check the status code
        //check spell.effect is present for each spell
    })

    test('returns a specific spell', async () => {
        //self
        //TODO: zavolajte get endpoint na id nejakeho konkretneho kuzla, napr http://localhost:3000/spells/5b74ebd5fb6fc0739646754c
        //TODO: vytiahnite z odpovede jednotlive atributy kuzla (type, effect, is unforgivable)
        //overte ze hodnoty sa rovnaju ocakavanym
    })

    test('adds new spell', async () => {
        //spolu
        //zavolat endpoint reset
        //vytvorit objekt noveho kuzla
        //poslat post request na vytvorenie kuzla
        //vytiahnut ID kuzla
        //SAMI: zavolat get request na id noveho kuzla
        //SAMI: pridajte page fixture, otvorte stranku a vyhladajte dane kuzlo na stranke

        //TYPESCRIPT: spolu
        //vytvorit classu pre spell
        //definovat povinne a nepovinne atributy
        //ak zostane cas ukazat enum pre spelltype
    })
})