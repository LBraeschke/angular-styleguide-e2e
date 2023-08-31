import * as merge from 'deepmerge';
import { config } from './wdio.conf';

import { ChromeUpdateService } from './services/integration-proxy-service/chrome-update-service';
import { UiIntegrationTestProxyService } from './services/integration-proxy-service/ui-proxy-server';

export const localConfig = merge(
  config,
  {
    specs: ['./src/integration/**/*.e2e.ts'],
    services: [
      [ChromeUpdateService],
      'chromedriver',
      'shared-store',
      [UiIntegrationTestProxyService, {}],
    ],
  },
  { clone: false }
);

exports.config = localConfig;
