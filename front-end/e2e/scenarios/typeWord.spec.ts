import { test } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { LoginFixture } from "../../src/app/pages/login/login.fixture";
import {AcFixture} from "../../src/app/pages/ac/ac.fixture";
import {Step1Fixture} from "../../src/app/pages/jeu_etape1/jeu_etape1.fixture";

test.describe('Scenario 4 display', () => {
  let login: LoginFixture;
  let ac : AcFixture;
  let step1 : Step1Fixture;

  test.beforeEach(async ({ page }) => {
    login = new LoginFixture(page);
    ac = new AcFixture(page);
    step1 = new Step1Fixture(page);
  });

  test('W2G test', async ({ page }) => {
    await page.goto(testUrl);
    await login.loginFirstPlayer();
    await ac.getBoutonJouer().click();
    await step1.typeCurrentWord();
  });
});
