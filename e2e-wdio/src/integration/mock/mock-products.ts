const mockServerClient = require('mockserver-client').mockServerClient;
export async function setResponseForProducts(result: any, delay: number = 300): Promise<void> {
  await mockServerClient('localhost', Number(await browser.sharedStore.get('backendPort')))
    .mockAnyResponse({
      id: '/products.json',
      httpRequest: {
        path: `/assets/products.json`,
      },
      httpResponse: {
        body: JSON.stringify(result),
        delay: {
          timeUnit: 'MILLISECONDS',
          value: delay,
        },
      },
    })
    .then(undefined, function (error) {
      console.log(error);
    });
}
