import { Services } from '@wdio/types';
import { execSync } from 'child_process';

/**
 * Service to update chromedriver to used version!
 */
export class ChromeUpdateService implements Services.ServiceInstance {
  async onPrepare() {
    execSync('node ./node_modules/chromedriver/install.js', {
      stdio: 'inherit',
      env: { ...process.env, DETECT_CHROMEDRIVER_VERSION: 'true' },
    });
  }
}
