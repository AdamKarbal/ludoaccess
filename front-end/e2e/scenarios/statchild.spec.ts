import { test, expect } from '@playwright/test';
import { LoginFixture } from 'src/app/pages/login/login.fixture';
import { ReglageFixture } from 'src/app/pages/reglage/reglage.fixture';
import { StatsFixture } from 'src/app/pages/player-stats/player-stats.fixture'
import {testConfig} from "../e2e.config";
//import { testUrl } from 'e2e/e2e.config';

const testUrl = testConfig.frontUrl;

test.describe('Stats feature', ()=> {
    let login: LoginFixture;
    let reglage: ReglageFixture;
    let stats: StatsFixture;
    test('Consulter les statistiques d1 enfant', async({page}) =>{
        await page.goto(testUrl);
        await expect(page).toHaveURL(testUrl);
        await test.step('Se connecter', async () => {
            login = new LoginFixture(page);
            await login.loginErgotherapeute();
            await expect(page).toHaveURL(testUrl+"/reglage");

        });
        await test.step('Cliquer sur le bouton statisique d1 enfant', async () => {
            reglage = new ReglageFixture(page);
            await reglage.clickEnfantFirstChild().click();
            await expect(page).toHaveURL(testUrl+"/stats/");
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
            await expect(page).toHaveURL(testUrl+"/reglage");
            await reglage.getButtonRetourReglages().click();
            await expect(page).toHaveURL(testUrl);
        });
});
});
