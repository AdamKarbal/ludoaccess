import { test, expect } from '@playwright/test';
import { AcFixture } from 'src/app/pages/ac/ac.fixture';
import { LoginFixture } from 'src/app/pages/login/login.fixture';
import { ReglageFixture } from 'src/app/pages/reglage/reglage.fixture';

import {testConfig} from "../e2e.config";
//import { testUrl } from 'e2e/e2e.config';

const testUrl = testConfig.frontUrl;


test.describe('Settings feature', () => {

    let app: LoginFixture;
    let reglages: ReglageFixture;
    let ac:AcFixture;

    test('Modifier les réglages de l\'enfant', async ({ page }) => {
        app = new LoginFixture(page);
        await page.goto(testUrl);
        await expect(page).toHaveURL(testUrl);
        await expect(app.loginErgotherapeute()).toBeTruthy();
        await expect(page).toHaveURL(testUrl+"/reglage");
        await test.step('Cliquer sur l\'enfant à modifier', async () => {
            reglages = new ReglageFixture(page);
            await reglages.getFirstPlayerInReglage().click();
            const select = page.locator('select[name="chooseBackGround"]');
            await expect(select).toBeVisible();
            await select.selectOption({ value: 'Forest' });
        });
        await test.step('Aller dans l\'étape 1 et check', async () => {
            ac = new AcFixture(page);
            const boutonRetour = reglages.getButtonDeconnexion();
            await boutonRetour.click();
            await expect(page).toHaveURL(testUrl);
            await app.loginFirstPlayer();
            await expect(page).toHaveURL(testUrl+"/acceuil");
            await ac.getBoutonJouer().click();
            await expect(page).toHaveURL(testUrl+"/jeu");
            const imageaComparer = page.locator('div.BG');
        });


    });
});
