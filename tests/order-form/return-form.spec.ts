import { test, expect } from "@playwright/test";

const orderNumber = "C4AS23";
const email = "myemail@email.com";

const incorrectEmail = "myIncorrectEmail.com";

test.beforeEach(async ({ page }) => {
  await page.goto("https://returns.itsrever.com/partner");
});

// Test suite for the return order form
test.describe("Return order form", () => {

  // Verify the return initiation process for registered users
  test("Fill return form", async ({ page }) => {
    await expect(page).toHaveTitle("Mock e-commerce");
    await page.getByPlaceholder("X01234").press("CapsLock");
    await page.getByPlaceholder("X01234").fill(orderNumber);
    await page.getByPlaceholder("X01234").press("CapsLock");
    await page.getByPlaceholder("example@partner.com").click();
    await page.getByPlaceholder("example@partner.com").fill(email);
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText(orderNumber)).toBeVisible();
  });

  // Verify the return initiation process for users who put in an incorrect e-mail format
  test("Fill return form with incorrect email format", async ({ page }) => {
    await expect(page).toHaveTitle("Mock e-commerce");
    await page.getByPlaceholder("X01234").fill(orderNumber);
    await page.getByPlaceholder("example@partner.com").fill(incorrectEmail);

    await page.getByRole("button", { name: "Continue" }).click();


    // Expect an error message to be displayed
    await expect(page.getByText("Enter a valid e-mail")).toBeVisible();
  });


   // Verify the the process of viewing products related to a specified non-existent order number
  test("Empty order number", async ({ page }) => {
    await page.getByPlaceholder("X01234").fill("");
    await page.getByPlaceholder("example@partner.com").fill(email);

    await page.getByRole("button", { name: "Continue" }).click();

    // Expect an error message to be displayed
    await expect(page.getByText('The order number or the email')).toBeVisible();
  });

});
