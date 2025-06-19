import { test } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {WordsFixture} from "../../src/app/components/words/words.fixture";
import {LoginFixture} from "../../src/app/pages/login/login.fixture";
import {ReglageFixture} from "../../src/app/pages/reglage/reglage.fixture";

test.describe('Scenario 6 display', () => {
  let words : WordsFixture;
  let login : LoginFixture;
  let reglage : ReglageFixture;
  test('addWord test', async ({ page }) => {
    await page.goto(testUrl);
    await test.step('Login as Ergotherapeute', async () => {
        login = new LoginFixture(page);
        await login.loginErgotherapeute();
    });
    await test.step('Go to words page', async () => {
        reglage = new ReglageFixture(page);
        await reglage.goToWords();
    });
    await test.step('Add a word', async () => {
          words = new WordsFixture(page);
        await words.addWord("Avion");
    });
  });
});
