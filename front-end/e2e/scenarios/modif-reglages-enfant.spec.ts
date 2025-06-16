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
    });
});
