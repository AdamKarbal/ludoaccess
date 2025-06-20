import { test } from '@playwright/test';
import {WordsFixture} from "../../src/app/components/words/words.fixture";
import {LoginFixture} from "../../src/app/pages/login/login.fixture";
import {ReglageFixture} from "../../src/app/pages/reglage/reglage.fixture";
import {testConfig} from "../e2e.config";
//import { testUrl } from 'e2e/e2e.config';

const testUrl = testConfig.frontUrl;

test.describe('Display words test', () => {
  let words : WordsFixture;
  let login : LoginFixture;
  let reglage : ReglageFixture;

  test('displayWords test', async ({ page }) => {
    reglage = new ReglageFixture(page);
    words = new WordsFixture(page);
    login = new LoginFixture(page);
    await page.goto(testUrl);
    await login.loginErgotherapeute();
    await reglage.goToWords();
    await words.seeEasyWords();
    await words.seeMediumWords();
    await words.seeHardWords();

  });
});
