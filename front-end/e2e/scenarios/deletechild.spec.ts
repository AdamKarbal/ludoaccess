import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {WordsFixture} from "../../src/app/components/words/words.fixture";
import {LoginFixture} from "../../src/app/pages/login/login.fixture";
import {Reglage} from "../../src/app/pages/reglage/reglage.fixture";


test.describe('Delete child', ()=> {
    let login: LoginFixture;
    let reglages: Reglage;
    test('Supprimer un enfant', async({page}) =>{
        await page.goto(testUrl);
        await expect(page).toHaveURL("http://localhost:4200");
        login = new LoginFixture(page);
        await test.step('Se connecter', async () => {
            await login.loginErgotherapeute();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
        });
        await test.step('Cliquer sur le bouton "Supprimer un enfant"', async () => {
            reglages = new Reglage(page);
            page.once('dialog', dialog => dialog.accept());
            await reglages.getFirstSupprimer().click();
        });
        await test.step('Quitter la page', async () => {
            await reglages.getButtonRetourReglages().click();
            await expect(page).toHaveURL("http://localhost:4200");
        });
});
});
