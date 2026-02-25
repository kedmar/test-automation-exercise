export interface BrowserConfig {
    viewport: { width: number; height: number };
    timeout: number;
    testMatch: RegExp;
}

export const browserConfig: BrowserConfig = {
    viewport: { width: 1680, height: 800 },
    timeout: 180 * 1000,
    testMatch: /.*.spec.ts/,
};
