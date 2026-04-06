import { test as base, Page } from "@playwright/test";

interface FronteggResponses {
    url: string;
    status: number;
    fronteggTraceId: string;
}

export const test = base.extend<{ fronteggReqMonitor: Page }>({
    fronteggReqMonitor: [
        async ({ page }, use, testInfo) => {
            let fronteggResponsesData: FronteggResponses[] = [];
            page.on("response", async response => {
                const url = response.url();
                const status = response.status();
                const fronteggTraceId = await response.headerValue('frontegg-trace-id');

                if (url.includes('fronteggers.stg.frontegg.com')) {
                    const fronteggResponse: FronteggResponses = {
                        url,
                        status,
                        fronteggTraceId: fronteggTraceId || 'No trace ID found.',
                    };

                    fronteggResponsesData.push(fronteggResponse);
                }
            });

            await use(page);

            if (testInfo.status === 'failed' && fronteggResponsesData.length > 0) {
                await testInfo.attach("frontegg-responses-trace-ids.json", {
                    body: JSON.stringify(fronteggResponsesData, null, 2),
                    contentType: "application/json",
                });
            }
        },
        {
            auto: true,
        },
    ],
});

export { expect, selectors, Page } from "@playwright/test";