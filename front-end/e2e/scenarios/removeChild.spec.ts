import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { LoginFixture} from "../../src/app/pages/login/login.fixture";
import {Reglage} from "../../src/app/pages/reglage/reglage.fixture";

test.describe('Settings feature', () => {
  let login:LoginFixture;
  let reglage:Reglage;
  test('Supprimer tous les enfants', async ({page}) => {
    login = new LoginFixture(page);

    await test.step('Se connecter à la page ergo', async () => {
      await page.goto(testUrl);
      await expect(page).toHaveURL('http://localhost:4200');
      await login.loginErgotherapeute();
      await expect(page).toHaveURL('http://localhost:4200/reglage');
    });

    await test.step('Supprimer tous les enfants', async () => {
      reglage = new Reglage(page);
      let enfants = reglage.getAllChilds();

      while (await enfants.count() > 0) {
        page.once('dialog', async (dialog) => {
          await dialog.accept();
        });
        const premier = enfants.first();
        await reglage.getSupprimer(premier).click();
        enfants = reglage.getAllChilds();
      }
    });
  });
});
