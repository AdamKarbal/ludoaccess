import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Settings feature', ()=> {

    test('Ajouter un enfant', async({page}) =>{
        await page.goto(testUrl);
        await expect(page).toHaveURL("http://localhost:4200");
        await test.step('Se connecter', async () => {
            await page.getByRole('heading', { name: /Ergothérapeute/i }).locator('..').click();
            await page.getByRole('button', { name: /se connecter/i }).click();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
        });
        await test.step('Cliquer sur le bouton "Ajouter un enfant"', async () => {
            await page.getByRole('button', {name: /Ajouter un enfant/i}).click();
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
            await expect(page.getByText('Ali Madandar')).toBeVisible();
        });

});
});