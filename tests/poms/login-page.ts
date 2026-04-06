import { expect, selectors, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly providerButtonsList: Locator;
  readonly identifier: Locator;
  readonly password: Locator;
  readonly submitBtn: Locator;
  readonly githubBtn: Locator;
  readonly microsoftBtn: Locator;
  readonly customBtn: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.providerButtonsList = page.getByLabel(new RegExp('continue with.*'));
    this.identifier = page.getByPlaceholder('name@example.com');
    this.password = page.getByRole('textbox', { name: 'password' });
    selectors.setTestIdAttribute('data-test-id');
    this.submitBtn = page.getByTestId('submit-btn');
    this.githubBtn = this.providerButtonsList.and(page.getByTestId('github-btn'));
    this.microsoftBtn = this.providerButtonsList.and(page.getByTestId('microsoft-btn'));
    this.customBtn = this.providerButtonsList.and(page.getByTestId('Auth0-btn'));
    this.loginError = page.getByTestId('login-error');
  }

  async goto() {
    await this.page.goto('https://fronteggers.stg.frontegg.com/oauth/account/login');
  }

  async validateProviderButtons() {
    await expect(this.providerButtonsList).toHaveCount(3);
    await expect(this.githubBtn).toBeVisible();
    await expect(this.microsoftBtn).toBeVisible();
    await expect(this.customBtn).toBeVisible();
  }

  async fillLoginFields(email: string, password: string) {
    await expect(this.identifier).toBeVisible();
    await this.identifier.fill(email);
    await this.password.fill(password);
  }

  async submitAndvalidateResponseStatus(expectedStatus: number) {
    const responsePromise = this.page.waitForResponse('https://fronteggers.stg.frontegg.com/frontegg/identity/resources/auth/v1/user');
    await this.submitBtn.click();
    const response = await responsePromise;
    expect(response.status()).toBe(expectedStatus);
  }

  async validateLoginErrorIsPresent() {
    await expect(this.loginError).toContainText('Incorrect email or password');
  }
}