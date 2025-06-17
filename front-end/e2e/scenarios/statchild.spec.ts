import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { LoginFixture } from 'src/app/pages/login/login.fixture';
import { Reglage } from 'src/app/pages/reglage/reglage.fixture';
import { StatsFixture } from 'src/app/pages/player-stats/player-stats.fixture';

test.describe('Stats feature', ()=> {
    let login: LoginFixture;
    let reglage: Reglage;
    let stats: StatsFixture;
    test('Consulter les statistiques d1 enfant', async({page}) =>{
        await page.goto(testUrl);
        await expect(page).toHaveURL("http://localhost:4200");
        await test.step('Se connecter', async () => {
            login = new LoginFixture(page);
            await login.loginErgotherapeute();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
            
        });
        await test.step('Cliquer sur le bouton statisique d1 enfant', async () => {
            reglage = new Reglage(page);
            await reglage.clickEnfantFirstChild().click();
            await expect(page).toHaveURL(/^http:\/\/localhost:4200\/stats/);
        });
        await test.step('Regarder les statistiques dajd (tous les boutons)', async () => {
            stats = new StatsFixture(page);
            await stats.getButtonStatsToday().click();
            await stats.getButtonErreurParLettre().click();
            await stats.getButtonErreurParPosition().click();

        });
        await test.step('Regarder les statistiques de la semaine dernière (tous les boutons)', async () => {
            await stats.getButtonStatsLastWeek().click();
            await stats.getButtonErreurParLettre().click();
            await stats.getButtonErreurParPosition().click();
        });
        await test.step('Regarder les statistiques du mois dernier (tous les boutons)', async () => {
            await stats.getButtonStatsLastMonth().click();
            await stats.getButtonErreurParLettre().click();
            await stats.getButtonErreurParPosition().click();
        });
        await test.step('Quitter la page', async () => {
            await stats.getButtonRetourStats().click();
            await expect(page).toHaveURL("http://localhost:4200/reglage");
            await reglage.getButtonRetourReglages().click();
            await expect(page).toHaveURL("http://localhost:4200");
        });
});
});