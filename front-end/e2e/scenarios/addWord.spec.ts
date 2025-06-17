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
    await login.loginErgotherapeute();
    await reglage.goToWords();
    await words.addWord("Avion");
  });
});
