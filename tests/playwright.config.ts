import {PlaywrightTestConfig} from '@playwright/test';
import {TestDirectory} from './utils/test-directory';
import {getReporters} from './getReporters';

const playwrightConfig: PlaywrightTestConfig = {
    use: {
        headless: false,
        ignoreHTTPSErrors: true,
        testIdAttribute: '',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        baseURL: 'http://localhost:9000',
    },
    projects: [
        {
            name: 'all',
            testDir: TestDirectory.ALL,
            testIgnore: [],
            testMatch: /.*.spec.ts/
        }
    ],
    outputDir: 'test-results/',
    reporter: getReporters(),
    testMatch: /.*.spec.ts/,
    timeout: 120 * 1000,
    expect: { timeout: 60 * 1000 },
    retries: 1,
    workers: 1
}

export default playwrightConfig;
