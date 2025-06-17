import { test } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { LoginFixture } from 'src/app/pages/login/login.fixture';
import { AcFixture } from 'src/app/pages/ac/ac.fixture';

test.describe('Collision raté avec le mob', () => {
  let login: LoginFixture;
  let ac: AcFixture;
  test('W2G test', async ({ page }) => {
    await page.goto(testUrl);
    await test.step("Accéder à la page de jeu", async () => {
        login = new LoginFixture(page);
        await login.loginFirstPlayer();
        ac = new AcFixture(page);
        await ac.getBoutonJouer().click();
    });
    await test.step("Taper le bon mot (avec une erreur)", async () => {
        await page.waitForSelector('#mot', { state: 'visible' });
        await page.waitForSelector('#mot .letter', { state: 'visible' });
        const letters = await page.$$eval('#mot .letter', spans =>
          spans.map(span => span.textContent?.trim() || '')
        );
        await page.keyboard.press('a'); 
        for (const letter of letters) {
          await page.keyboard.type(letter);
        }
    });
    await test.step("Collision jusqua le mob", async () =>{
      await page.keyboard.down('d');
      await page.waitForSelector('.letter-box', { state: 'visible' });
      await page.keyboard.up('d');
    });
    await test.step("Perdre le mini jeu", async () =>{
      while(true) {
        await page.keyboard.press('d');
        if (await page.locator('.gameover-box').isVisible()) break;
      }       
    });
    await test.step("Quitter la partie", async () => {
      await page.getByRole('button', { name: 'Quitter' }).click();
      await page.getByRole('button', { name: 'Déconnexion' }).click();
});
});
});
