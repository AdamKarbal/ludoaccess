import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Delete child', ()=> {

    test('Supprimer un enfant', async({page}) =>{
        await page.goto(testUrl);
        await expect(page).toHaveURL("http://localhost:4200");
        await test.step('Se connecter', async () => {
            await page.getByRole('heading', { name: /Ergothérapeute/i }).locator('..').click();
            await page.getByRole('button', { name: /se connecter/i }).click();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
        });
        await test.step('Cliquer sur le bouton "Supprimer un enfant"', async () => {
            page.once('dialog', dialog => dialog.accept());
            await page.getByRole('button', {name: /Supprimer/i}).first().click();
        });

        await test.step('Quitter la page', async () => {
            await page.getByRole('button', { name: 'Déconnexion' }).click();
            await expect(page).toHaveURL("http://localhost:4200");
        });
});
});
