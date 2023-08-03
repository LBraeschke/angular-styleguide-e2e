/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { devices, PlaywrightTestConfig } from '@playwright/test';
import { baseConfig } from './playwright.config.base';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: './src/ui-integration',
  use: {
    headless: false,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome'],
    },
  ],
};
export default config;
