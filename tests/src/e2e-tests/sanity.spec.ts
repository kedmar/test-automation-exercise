import {test, expect} from '@playwright/test';

test.describe('Sanity', () => {
    test('should load the application', async ({page}) => {
        await page.goto('/');
        await expect(page.locator('h1')).toHaveText('Frontegg React App');
    });
});
