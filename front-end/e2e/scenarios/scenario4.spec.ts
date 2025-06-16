import { test } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Scenario 4 display', () => {
  test('W2G test', async ({ page }) => {
    await page.goto(testUrl);
    await page.getByRole('heading', { name: 'Jean Malay' }).click();
    await page.click(".btn-principal");
    await page.getByRole('button', { name: 'Jouer' }).click();

    const letters = await page.$$eval('#mot .letter', spans =>
      spans.map(span => span.textContent?.trim() || '')
    );
    for(const letter of letters){
      await page.keyboard.type(letter);
    }
  });
});
