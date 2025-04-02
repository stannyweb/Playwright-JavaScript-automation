import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SecureAreaPage } from "../pages/SecureAreaPage";

test("User can log in", async ({ page }) => {
  //Arrange
  const username = "tomsmith";
  const password = "SuperSecretPassword!";
  const loginPage = new LoginPage(page);
  const secureAreaPage = new SecureAreaPage(page);

  //Act
  await loginPage.goto();
  await loginPage.login(username, password);

  //Assert
  await secureAreaPage.verifyLoggedIn();
});

test("User can log in and out", async ({ page }) => {
  // Arrange
  const username = "tomsmith";
  const password = "SuperSecretPassword!";
  const loginPage = new LoginPage(page);
  const secureAreaPage = new SecureAreaPage(page);

  // Act
  await loginPage.goto();
  await loginPage.login(username, password);

  // Assert
  await secureAreaPage.verifyLoggedIn();

  // Act again
  await secureAreaPage.logout();

  // Assert again
  await loginPage.verifyLoginPage();
});
