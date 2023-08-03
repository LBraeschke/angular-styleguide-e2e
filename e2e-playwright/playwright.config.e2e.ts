/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { PlaywrightTestConfig } from '@playwright/test';
import { baseConfig } from './playwright.config.base';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  testDir: './src/e2e',
};
export default config;
