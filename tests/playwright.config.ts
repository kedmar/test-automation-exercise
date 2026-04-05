import { PlaywrightTestConfig } from '@playwright/test';
import { TestDirectory } from './utils/test-directory';
import { getReporters } from './utils/getReporters';

const playwrightConfig: PlaywrightTestConfig = {
    use: {
        headless: false,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        baseURL: 'http://localhost:3000'
    },
    projects: [
        {
            name: 'HealthCheck',
            testMatch: /global.setup.ts/
        },
        {
            name: 'all',
            testDir: TestDirectory.ALL,
            testMatch: /.*.spec.ts/,
            dependencies: ['HealthCheck'],
            testIgnore: []
        }
    ],
    outputDir: 'test-results/',
    reporter: getReporters(),
    timeout: 120 * 1000,
    expect: { timeout: 60 * 1000 },
    retries: 1,
    workers: 1
};

export default playwrightConfig;
