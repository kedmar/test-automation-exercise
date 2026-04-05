import { test as setup, expect } from '@playwright/test';

setup.describe('Healthcheck', () => {
    setup('Validate `https://api.stg.frontegg.com/test` returns 200', async ({request}) => {
        const response = await request.get('https://api.stg.frontegg.com/test')
        const responseStatus = await response.status()
        await expect(responseStatus).toEqual(200)
    })
});