import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Settings feature', () => {

    let app: AppFixture;

    test('Modifier les réglages de l\'enfant', async ({ page }) => {
        app = new AppFixture(page);
        await page.goto(testUrl);
        await expect(page).toHaveURL("http://localhost:4200");
        await expect(app.loginErgotherapeute()).toBeTruthy();
        await expect(page).toHaveURL("http://localhost:4200/reglage");
        await test.step('Cliquer sur l\'enfant à modifier', async () => {
            await app.getFirstPlayerInReglage().click();
            const select = page.locator('select[name="chooseBackGround"]');
            await expect(select).toBeVisible();
            await select.selectOption({ value: 'Forest' });
            const inputNumberOfWords = page.locator('input[name="numberOfWords"]');
            await inputNumberOfWords.fill('2');

        });
        await test.step('Aller dans l\'étape 1 et check', async () => {
            const boutonRetour = await app.getButtonRetourReglages();
            await boutonRetour.click();
            await expect(page).toHaveURL("http://localhost:4200");
            await app.loginFirstPlayer();
            await expect(page).toHaveURL("http://localhost:4200/acceuil");
            await app.getBoutonJouer().click();
            await expect(page).toHaveURL("http://localhost:4200/jeu");
            const imageaComparer = page.locator('div.BG');
            const numberOfWordsLocator = page.locator('div.word-counter');
            const numberOfWordsText = await numberOfWordsLocator.textContent();
            const parts = numberOfWordsText?.split('/');
            const numberOfWords = Number(parts?.[1]?.trim());
            expect(numberOfWords).toBe(2);
            await expect(imageaComparer).toBeVisible();

        });


    });
});
