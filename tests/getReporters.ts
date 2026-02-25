import {ReporterDescription} from '@playwright/test';

export function getReporters(): ReporterDescription[] {
    const reporters: ReporterDescription[] = [];
    reporters.push(['list', {printSteps: true}]);
    return reporters;
}