import { expect, type Locator, type Page } from '@playwright/test';

export class FronteggReactApp {
  readonly page: Page;
  readonly appHeader: Locator;
  readonly clickToLoginButton: Locator;
  readonly fronteggLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appHeader = page.locator('h1');
    this.clickToLoginButton = page.getByText('Click me to login - hosted');
    this.fronteggLink = this.page.getByLabel('powered by frontegg');
  }

  async goto() {
    await this.page.goto('/');
  }

  async validateHeaderHasText(textToValidate: string) {
    await expect(this.appHeader).toHaveText(textToValidate);
  }

  async navToLogin() {
    await this.clickToLoginButton.click();
    await expect(this.fronteggLink).toBeVisible();
  }
}