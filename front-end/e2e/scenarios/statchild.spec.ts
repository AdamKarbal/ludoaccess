import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Stats feature', ()=> {

    test('Consulter les statistiques d1 enfant', async({page}) =>{
        await page.goto(testUrl);
        await expect(page).toHaveURL("http://localhost:4200");
        await test.step('Se connecter', async () => {
            await page.getByRole('heading', { name: /Ergothérapeute/i }).locator('..').click();
            await page.getByRole('button', { name: /se connecter/i }).click();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
        });
        await test.step('Cliquer sur le bouton statisique d1 enfant', async () => {
            await page.getByRole('button', {name: /📊 Stats/i}).first().click();
            await expect(page).toHaveURL(/^http:\/\/localhost:4200\/stats/);
        });
        await test.step('Regarder les statistiques dajd (tous les boutons)', async () => {
            await page.getByRole('button', { name: 'Aujourd’hui' }).click();
            await page.getByRole('button', { name: 'Erreurs par lettre' }).click();
            await page.getByRole('button', { name: 'Erreurs par position dans le mot' }).click();

        });
        await test.step('Regarder les statistiques de la semaine dernière (tous les boutons)', async () => {
            await page.getByRole('button', { name: 'Dernière semaine' }).click();
            await page.getByRole('button', { name: 'Erreurs par lettre' }).click();
            await page.getByRole('button', { name: 'Erreurs par position dans le mot' }).click();
        });
        await test.step('Regarder les statistiques du mois dernier (tous les boutons)', async () => {
            await page.getByRole('button', { name: 'Dernier mois' }).click();
            await page.getByRole('button', { name: 'Erreurs par lettre' }).click();
            await page.getByRole('button', { name: 'Erreurs par position dans le mot' }).click();
        });
        await test.step('Quitter la page', async () => {
            await page.getByRole('button', { name: 'Retour' }).click();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
            await page.getByRole('button', { name: 'Retour' }).click();
            await expect(page).toHaveURL("http://localhost:4200");
        });
});
});