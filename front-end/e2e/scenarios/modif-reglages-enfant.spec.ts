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
            await expect(app.regalageEnfantaModifier('Nicolas mm')).toBeTruthy();
            const select = page.locator('select[name="chooseBackGround"]');
            await expect(select).toBeVisible();
            await select.selectOption({ value: 'Forest' });
            const inputNumberOfWords = page.locator('input[name="numberOfWords"]');

            // Option 1 : Remplacer la valeur directement
            await inputNumberOfWords.fill('2');  // met la valeur 10 par exemple

        });
        await test.step('Aller dans l\'étape 1 et check', async () => {
            const boutonRetour = await app.getButtonRetourReglages(); // ici on attend le Locator
            await boutonRetour.click();
            await expect(app.jouer('Nicolas mm')).toBeTruthy();

        });



    });
});
