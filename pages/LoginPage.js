import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByRole("textbox", { name: "username" });
    this.passwordField = page.getByRole("textbox", { name: "password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.loginPageHeader = page.locator("h2");
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/login");
    await this.verifyLoginPage();
  }

  async verifyLoginPage() {
    await expect(this.loginPageHeader).toContainText("Login Page");
  }

  async enterUsername(username) {
    await this.usernameField.click();
    await this.usernameField.fill(username);
    return this;
  }

  async enterPassword(password) {
    await this.passwordField.click();
    await this.passwordField.fill(password);
    return this;
  }

  async clickLoginButton() {
    await this.loginButton.click();
    return this;
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    return this;
  }
}
