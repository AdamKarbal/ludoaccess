import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {AppFixture} from "../../src/app/app.fixture";
import {LoginFixture} from "../../src/app/pages/login/login.fixture";
import {AcFixture} from "../../src/app/pages/ac/ac.fixture";

test.describe('Game feature', ()=> {
    let login: LoginFixture;
    let ac: AcFixture;

    test("Jouer au jeu",async ({page})=> {
      login = new LoginFixture(page);
      ac = new AcFixture(page);

      await page.goto(testUrl);
      await page.waitForSelector('app-listofpeople .person-info');
      await login.loginFirstPlayer();
      await expect(page).toHaveURL(testUrl+'/acceuil');
      await ac.getBoutonJouer().click();
      await expect(page).toHaveURL(testUrl+'/jeu');
      const letters = await page.$$eval('#mot .letter', spans =>
        spans.map(span => span.textContent?.trim() || '')
      );
      await page.keyboard.type(letters[0]+1);
      for(const letter of letters){
        await page.keyboard.type(letter);
      }
      const coinSelector = 'app-game .coin';

      while (await page.locator(coinSelector).count() > 0) {
        const coin = page.locator(coinSelector).first();
        console.log(typeof coin);
        await coin.click();
      }


      const letters2 = await page.$$eval('app-word2guess .word2guess #mot .letter', spans =>
        spans.map(span => span.textContent?.trim() || '')
      );
      for(const letter of letters2){
        await page.keyboard.type(letter);
      }
    })
})
