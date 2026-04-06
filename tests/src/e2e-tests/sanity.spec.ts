import { test, expect } from '../../base';
import { FronteggReactApp } from '../../poms/frontegg-react-app';

test.describe('Sanity', () => {
    test('should load the application', async ({ page }) => {
        const fronteggReactApp = new FronteggReactApp(page);
        await fronteggReactApp.goto();
        await fronteggReactApp.validateHeaderHasText('Frontegg React App');
    });
});
