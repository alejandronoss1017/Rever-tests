import { test, expect } from "@playwright/test";

const orderNumber = "C4AS23";
const email = "myemail@email.com";

test.beforeEach(async ({ page }) => {
  await page.goto("https://returns.itsrever.com/partner");
});

test.describe("Return address form", () => {
    
  // Verify the home pickup for returns in Spain
  test("Fill return address form with Spain value", async ({ page }) => {
    await page.getByPlaceholder("X01234").click();
    await page.getByPlaceholder("X01234").fill(orderNumber);
    await page.getByPlaceholder("example@partner.com").click();
    await page.getByPlaceholder("example@partner.com").fill(email);
    await page.getByRole("button", { name: "Continue" }).click();

    await page.locator(".sc-dtInlm").first().click();
    await page.getByTestId("modal").getByRole("img").nth(2).click();
    await page.getByText("Wrong color").click();
    await page
      .getByTestId("modal")
      .getByRole("button", { name: "Continue" })
      .click();

    await page.getByRole("button", { name: "Continue (2)" }).click();

    const selectInput = page.getByLabel("Country");

    await selectInput.click();

    await page.getByRole("option", { name: "Spain" }).click();

    await expect(selectInput).toHaveValue("Spain");
  });

  // Verify the home pickup for returns in Colombia
  test("Fill return address form with Colombia value", async ({ page }) => {
    await page.getByPlaceholder("X01234").click();
    await page.getByPlaceholder("X01234").fill(orderNumber);
    await page.getByPlaceholder("example@partner.com").click();
    await page.getByPlaceholder("example@partner.com").fill(email);
    await page.getByRole("button", { name: "Continue" }).click();

    await page.locator(".sc-dtInlm").first().click();
    await page.getByTestId("modal").getByRole("img").nth(2).click();
    await page.getByText("Wrong color").click();
    await page
      .getByTestId("modal")
      .getByRole("button", { name: "Continue" })
      .click();

    await page.getByRole("button", { name: "Continue (2)" }).click();

    const selectInput = page.getByLabel("Country");

    await selectInput.click();

    await page.getByRole("option", { name: "Colombia" }).click();

    await expect(selectInput).toHaveValue("Colombia");
  });
});
