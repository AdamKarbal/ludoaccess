import { test } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Scenario 6 display', () => {
  test('addWord test', async ({ page }) => {
    await page.goto(testUrl);
    await page.getByRole('heading', { name: 'Ergothérapeute' }).click();
    await page.click(".btn-principal");
    await page.click(".words-btn");
    await page.getByRole('button', { name: 'Ajouter un mot' }).click();
    await page.getByPlaceholder("Mot").fill("Avion");
    await page.getByTestId('selector').selectOption('Facile');
    await page.getByRole('button', { name : 'Valider'});
  });
});
