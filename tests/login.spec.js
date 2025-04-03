import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SecureAreaPage } from "../pages/SecureAreaPage";

test.describe("Authentication flow", () => {
  const USERNAME = "tomsmith";
  const PASSWORD = "SuperSecretPassword!";

  let loginPage;
  let secureAreaPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    await loginPage.goto();
  });

  test("User can log in", async () => {
    await test.step("Act", async () => {
      await loginPage.login(USERNAME, PASSWORD);
    });

    await test.step("Assert", async () => {
      await secureAreaPage.verifyLoggedIn();
    });
  });

  test("User can log in and out", async () => {
    await test.step("Act", async () => {
      await loginPage.login(USERNAME, PASSWORD);
    });

    await test.step("Assert", async () => {
      await secureAreaPage.verifyLoggedIn();
    });

    await test.step("Act", async () => {
      await secureAreaPage.logout();
    });

    await test.step("Assert", async () => {
      await loginPage.verifyLoginPage();
    });
  });
});
