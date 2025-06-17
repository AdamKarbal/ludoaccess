import { test } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {WordsFixture} from "../../src/app/components/words/words.fixture";
import {LoginFixture} from "../../src/app/pages/login/login.fixture";
import {Reglage} from "../../src/app/pages/reglage/reglage.fixture";

test.describe('Scenario 6 display', () => {
  let words : WordsFixture;
  let login : LoginFixture;
  let reglage : Reglage;

  test('addWord test', async ({ page }) => {
    reglage = new Reglage(page);
    words = new WordsFixture(page);
    login = new LoginFixture(page);
    await page.goto(testUrl);
    test.step('Login as Ergotherapeute', async () => {
        await login.loginErgotherapeute();
    });
    test.step('Go to words page', async () => {
        await reglage.goToWords();
    });
    test.step('Add a word', async () => {
        await words.addWord("Avion");
    });
  });
});
