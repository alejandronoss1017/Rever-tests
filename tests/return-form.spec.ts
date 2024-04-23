import { test, expect } from '@playwright/test';

const orderNumber = 'C4AS23';
const email = 'myemail@email.com'

test('Fill return form', async ({ page }) => {

  await page.goto('https://returns.itsrever.com/partner');

  await expect(page).toHaveTitle('Mock e-commerce');
  await page.getByPlaceholder('X01234').press('CapsLock');
  await page.getByPlaceholder('X01234').fill(orderNumber);
  await page.getByPlaceholder('X01234').press('CapsLock');
  await page.getByPlaceholder('example@partner.com').click();
  await page.getByPlaceholder('example@partner.com').fill(email);
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText(orderNumber)).toBeVisible();
});