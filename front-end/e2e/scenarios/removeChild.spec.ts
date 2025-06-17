import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import {AppFixture} from "../../src/app/app.fixture";

test.describe('Settings feature', ()=> {
  let app: AppFixture;
  test('Supprimer un enfant', async({page}) => {
    app=new AppFixture(page);
    await page.goto(testUrl);
    await expect(page).toHaveURL("http://localhost:4200");
    await test.step('Se connecter', async () => {
      await page.getByRole('heading', {name: /Ergothérapeute/i}).locator('..').click();
      await page.getByRole('button', {name: /se connecter/i}).click();
      await expect(page).toHaveURL("http://localhost:4200/reglage");
      const enfants= page.locator('');
    });
  })
})
