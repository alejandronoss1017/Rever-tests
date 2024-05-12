import { test, expect } from '@playwright/test';

const orderNumber = "C4AS23";
const email = "myemail@email.com";

test.beforeEach(async ({ page }) => {
  await page.goto("https://returns.itsrever.com/partner");

  // Complete the initial form
  await page.getByPlaceholder("X01234").click();
  await page.getByPlaceholder("X01234").fill(orderNumber);
  await page.getByPlaceholder("example@partner.com").click();
  await page.getByPlaceholder("example@partner.com").fill(email);
  await page.getByRole("button", { name: "Continue" }).click();

  // Select the first item
  await page.locator('.sc-dtInlm').first().click();
  await page.getByTestId('0').click();
  await page.getByTestId('modal').getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Continue (1)' }).click();

  // Continue to the refund method (Address is added by default)
  await page.getByRole('button', { name: 'Continue' }).click();

});

test.describe("Refunds methods", () => {
  
  // Verify application processing for refund to original payment method
  test('Refund method with original payment method', async ({ page }) => {
    await page.getByText('Original payment methodYou').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.locator('[id="\\31 "] div').nth(2).click();
    await page.getByText(':00 - 20:00').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Complete' }).click();
  
    const successfulMessage = page.getByText('Thank you!Your return has');
    
    await expect(successfulMessage).toBeVisible();
  });
})
