import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {WordsFixture} from "../../src/app/components/words/words.fixture";
import {LoginFixture} from "../../src/app/pages/login/login.fixture";
import {Reglage} from "../../src/app/pages/reglage/reglage.fixture";


test.describe('Settings feature', ()=> {
    let login: LoginFixture;
    let reglage: Reglage;
    test('Ajouter un enfant', async({page}) =>{
        await page.goto(testUrl);
        await expect(page).toHaveURL("http://localhost:4200");
        await test.step('Se connecter', async () => {
            login = new LoginFixture(page);
            await login.loginErgotherapeute();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
        });
        await test.step('Cliquer sur le bouton "Ajouter un enfant"', async () => {
            reglage = new Reglage(page);
            await reglage.getButtonAjouterEnfant().click();
        });
        await test.step('Remplir le formulaire d\'ajout d\'enfant', async () => {
            await page.getByPlaceholder('Prénom').fill('Ali');
            await page.getByRole('textbox', { name: 'Nom', exact: true }).fill('Madandar');
            await page.getByPlaceholder('Âge').fill('26');
        });
        await test.step('Valider le formulaire', async () => {
            await page.getByRole('button', { name: 'Valider' }).click();
        });
        await test.step('Vérifier que l\'enfant a été ajouté', async () => {
            await expect(page.getByText('Ali Madandar').first()).toBeVisible();
        });
        await test.step('Quitter la page', async () => {
            await reglage.getButtonRetourReglages().click();
            await expect(page).toHaveURL("http://localhost:4200");
        });
});
});