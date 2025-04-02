import { expect } from "@playwright/test";

export class SecureAreaPage {
  constructor(page) {
    this.page = page;
    this.secureAreaHeader = page.locator("h4");
    this.successMessage = page.getByText("You logged into a secure area");
    this.logoutButton = page.getByRole("link", { name: "Logout" });
  }

  async verifyLoggedIn() {
    await expect(this.secureAreaHeader).toContainText(
      "Welcome to the Secure Area. When you are done click logout below."
    );
    await expect(this.successMessage).toBeVisible();
    return this;
  }

  async logout() {
    await this.logoutButton.click();
    return this;
  }
}
