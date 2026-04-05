import { test, expect, selectors, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Login Page Tests', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('/');
    });
    
    test.afterAll(async ({ browser }) => {
        browser.close;
    });
    
    test('verify SSO provider buttons on the hosted login page', async () => {
        const goToLogin = page.getByText('Click me to login - hosted');
        await expect(goToLogin).toBeVisible();
        goToLogin.click();
        const buttonsList = page.getByLabel(new RegExp('continue with.*'));
        await expect(buttonsList).toHaveCount(3);
        selectors.setTestIdAttribute('data-test-id');
        expect(buttonsList.and(page.getByTestId('github-btn'))).toBeVisible();
        expect(buttonsList.and(page.getByTestId('microsoft-btn'))).toBeVisible();
        expect(buttonsList.and(page.getByTestId('Auth0-btn'))).toBeVisible();
    });

    test('Failed login attempt', async () => {
        const identifier = page.getByPlaceholder('name@example.com');
        const password = page.getByRole('textbox', { name: 'password' });
        await identifier.fill('roni@gmail.com');
        await password.fill('Qwerty12!');
        selectors.setTestIdAttribute('data-test-id');
        const responsePromise = page.waitForResponse('https://fronteggers.stg.frontegg.com/frontegg/identity/resources/auth/v1/user');
        await page.getByTestId('submit-btn').click();
        const response = await responsePromise;
        expect(response.status()).toEqual(401);
        await expect(page.getByTestId('login-error')).toContainText('Incorrect email or password');
    })
});
