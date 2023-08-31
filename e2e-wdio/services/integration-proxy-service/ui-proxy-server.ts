import type { Services } from '@wdio/types';
import type { RemoteCapability } from '@wdio/types/build/Capabilities';
import type { Testrunner } from '@wdio/types/build/Options';
import type { HookFunctions } from '@wdio/types/build/Services';
import type { Server } from 'http';
import { createProxyServer } from 'http-proxy';
import * as http from 'http';
import { setValue } from '@wdio/shared-store-service';
const mockserver = require('mockserver-node');

/**
 * Service for WDIO test runner to start mock-http-server for SIT.
 */
export class UiIntegrationTestProxyService implements Services.ServiceInstance, HookFunctions {
  private proxyServer: Server | undefined;

  constructor() {}

  /*
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param config        wdio configuration object
   * @param capabilities  list of capabilities details
   * @param specs         list of spec file paths that are to be run
   * @param cid           worker id (e.g. 0-0)
   */
  public async beforeSession(
    config: Testrunner,
    capabilities: RemoteCapability,
    specs: string[],
    cid: string
  ): Promise<void> {
    // Calculate port from worker id, to be able to parallelize multiple proxies and mok band without to use a duplicated port.
    const frontendPort = 9005 + Number(cid.split('-')[1]) * 2;
    const backendPort = frontendPort + 1;

    this.startProxy(frontendPort, backendPort);

    await this.startBackendMock(backendPort);
    config.baseUrl = `${'http://localhost'}:${frontendPort}/`;
    await setValue('backendPort', backendPort);
  }

  /**
   * Gets executed right after terminating the webdriver session.
   * @param config        wdio configuration object
   */
  public async afterSession(config: Testrunner): Promise<void> {
    await mockserver.stop_mockserver({
      serverPort: Number(await browser.sharedStore.get('backendPort')),
    });
    this.proxyServer?.close(console.warn);
    console.log('Proxy(s) Stopped!');
  }

  private async startBackendMock(port: number) {
    await mockserver.start_mockserver({
      verbose: false,
      serverPort: port,
      jvmOptions: ['-Dmockserver.propertyFile=./mockserver.properties'],
    });
    console.log(`Started mockserver on https port`, port);
  }

  private startProxy(frontendPort: number, mockBackendPort: number): void {
    // Create proxy to redirect requests
    const proxy = createProxyServer({
      secure: false,
      timeout: 40000,
    }).on('error', (e: any) => {
      // ECONNRESET could happen for example if an active request is canceled. This could happen quite often in Ui tests.
      if (e.code !== 'ECONNRESET') {
        console.warn('PROXY ERROR:', JSON.stringify(e, null, ' '));
      }
    });

    this.proxyServer = http.createServer((req, res) => {
      if (
        req.url?.includes('/assets/products.json') ||
        req.url?.includes('/assets/recommendations.json')
      ) {
        // Redirect the request to the mock backend
        proxy.web(req, res, { target: `http://localhost:${mockBackendPort}` });
      } else {
        proxy.web(req, res, { target: 'http://localhost:4200' });
      }
    });

    console.log(`Proxy is listening on port ${frontendPort}`);
    this.proxyServer.listen(frontendPort);
  }
}
