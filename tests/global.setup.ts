import { test as setup, expect } from '@playwright/test';
import path from 'path';

const stateFile = path.join(__dirname, '../playwright/.state/state.json');

setup.describe('Healthcheck', () => {
    setup('Validate `https://api.stg.frontegg.com/test` returns 200', async ({ request }) => {
        const response = await request.get('https://api.stg.frontegg.com/test')
        expect(response.status()).toEqual(200)
    })
});
