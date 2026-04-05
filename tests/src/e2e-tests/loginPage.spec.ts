import { test, expect, selectors } from '@playwright/test';

test.describe('Login Page Tests', () => {
    test('verify SSO provider buttons on the hosted login page', async ({ page }) => {
        await page.goto('/');
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
});
