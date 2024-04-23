import { test, expect } from '@playwright/test';

const orderNumber = 'C4AS23';
const email = 'myemail@email.com'

test('Check if there are items in the return order', async ({ page }) => {
  await page.goto('https://returns.itsrever.com/partner');

  // Fill the form
  await page.getByPlaceholder('X01234').click();
  await page.getByPlaceholder('X01234').fill(orderNumber);
  await page.getByPlaceholder('example@partner.com').click();
  await page.getByPlaceholder('example@partner.com').fill(email);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Checks if the order are visible
  await expect(page.getByText('Dr.Zoidberg Plush (X-Small)8,00 €Quantity: 2Info MissingBaby Yoda (Grogu) Plush')).toBeVisible();
});