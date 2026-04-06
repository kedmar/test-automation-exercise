import { Context } from 'vm';
import { test, expect, selectors, Page } from '../../base';
import { FronteggReactApp } from '../../poms/frontegg-react-app';
import { LoginPage } from '../../poms/login-page';


test.describe('Login Page Tests', () => {

    test('verify SSO provider buttons on the hosted login page', async ({ page }) => {
        const fronteggReactApp = new FronteggReactApp(page);
        await fronteggReactApp.goto();
        await fronteggReactApp.navToLogin();
        const loginPage = new LoginPage(page);
        await loginPage.validateProviderButtons();
    });

    test('Failed login attempt', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        // const identifier = page.getByPlaceholder('name@example.com');
        // const password = page.getByRole('textbox', { name: 'password' });
        await loginPage.fillLoginFields('roni@gmail.com', 'Qwerty12!');
        // selectors.setTestIdAttribute('data-test-id');
        await loginPage.submitAndvalidateResponseStatus(400);
        await loginPage.validateLoginErrorIsPresent();
        // await expect(page.getByTestId('login-error')).toContainText('Incorrect email or password');
    });
});
