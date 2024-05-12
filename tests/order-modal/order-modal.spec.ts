import { test, expect } from '@playwright/test';

const orderNumber = 'C4AS23';
const email = 'myemail@email.com'

test.beforeEach(async ({ page }) => {
  await page.goto('https://returns.itsrever.com/partner');
});

// Verify the interface for specifying return details
test('test', async ({ page }) => {
  await page.getByPlaceholder('X01234').fill(orderNumber);
  await page.getByPlaceholder('example@partner.com').click();
  await page.getByPlaceholder('example@partner.com').fill(email);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('.sc-dtInlm').first().click();

  // Checks if the modal is visible
  await expect(page.getByTestId('modal')).toBeVisible();
  await page.getByTestId('close-button').click();

  await page.locator('div').filter({ hasText: /^Baby Yoda \(Grogu\) Plush 17"15,59 €17"$/ }).first().click();
  
  // Checks if the modal is visible
  await expect(page.getByTestId('modal')).toBeVisible();
  await page.getByTestId('close-button').click();
});