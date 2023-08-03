import * as merge from 'deepmerge';
import { config } from './wdio.conf';

export const localConfig = merge(
  config,
  {
    specs: ['./src/system-integration/**/*.e2e.ts'],
  },
  { clone: false }
);

exports.config = localConfig;
