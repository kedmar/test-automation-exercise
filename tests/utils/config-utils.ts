import {devices, Project} from '@playwright/test';

import {browserConfig} from './browser-config';
import {Device} from './device';
import {Browser} from './browser';

function generateBrowserConfig(device: Device, browser: Browser, useArgs?: object): Project {
    return {
        testMatch: browserConfig.testMatch,
        timeout: browserConfig.timeout,
        use: {
            ...devices[device],
            browserName: browser,
            viewport: browserConfig.viewport,
            ...useArgs,
            env: {
                MODE: 'hosted',
                FRAMEWORK: 'react',
            },
        },
    };
}

export const chromeConfig: Project = generateBrowserConfig(Device.DESKTOP_CHROME, Browser.CHROME, {
    permissions: ['clipboard-read'],
    launchOptions: {
        devtools: false,
    },
});
