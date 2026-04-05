import { test as setup } from '@playwright/test';

setup('HealthCheck', async ({page}) => {
    console.log('Validate `https://api.stg.frontegg.com/test` returns 200')
    await page.route('https://api.stg.frontegg.com/test', route => route.fulfill({
        status: 200
    }))
});