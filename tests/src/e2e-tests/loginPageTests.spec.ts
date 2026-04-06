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
        await loginPage.fillLoginFields('roni@gmail.com', 'Qwerty12!');
        await loginPage.submitAndvalidateResponseStatus(401);
        await loginPage.validateLoginErrorIsPresent();
    });
});
