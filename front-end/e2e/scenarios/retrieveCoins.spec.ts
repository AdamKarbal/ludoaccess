import { test } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { GameFixture } from 'src/app/pages/game/game.fixture';

test.describe('Collision raté avec le mob', () => {
  let gameFixture: GameFixture;
  test('W2G test', async ({ page }) => {
    await page.goto(testUrl);
    await test.step("Accéder à la page de jeu", async () => {
        await page.getByRole('heading', { name: 'Enfant Test' }).click();
        await page.getByRole('button', {name: 'Se connecter'}).click();
        await page.getByRole('button', { name: 'Jouer' }).click();
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
    await test.step("Récuperer les coins", async () =>{
        gameFixture = new GameFixture(page);
        gameFixture.initPlatforms();
        await page.keyboard.down('d');
        let index = 0;
        while(true){
          const result = await page.$eval('.player', el =>{
            const r = el.getBoundingClientRect();
            return{
              x: r.x,
              y : r.y,
              left : r.left,
              top : r.top,
              right: r.right,
              bottom: r.bottom,
              width: r.width,
              height: r.height
            };
          });
            const resultplatform = await page.$eval('.platform:nth-child(1)', el =>{
            const r = el.getBoundingClientRect();
            return{
              x: r.x,
              y : r.y,
              left : r.left,
              top : r.top,
              right: r.right,
              bottom: r.bottom,
              width: r.width,
              height: r.height
            };
          });
         console.log("player",result);
          console.log("platform",resultplatform);
          // await page.pause();
          const platform = await gameFixture.platform(index);
          // await page.pause();
         // console.log(platform);
          const playerPosition = await gameFixture.playerPosition();
          // const playerPositionGet = await gameFixture.playerGetPosition();
          //console.log("without",playerPosition);
          // console.log("with getBoundindclient ",playerPositionGet);
          if (resultplatform && result.left <= resultplatform.left-25 && result.left >= resultplatform.left-15) {
            console.log("Il doit sauter");
            await page.keyboard.down('z');
            await page.waitForTimeout(1000);
            await page.keyboard.up('z');            
            index++;
          }
          await page.pause();
        }
        
    });
});
});
