import { Product } from '../../../src/model/product';
import { Page } from '@playwright/test';
import { baseUrl } from '../../playwright.config.base';

export class ProductMock {
  constructor(private page: Page) {}

  async mockProducts(products: Array<Product>) {
    await this.page.route(`${baseUrl}/assets/products.json`, async (route) => {
      await route.fulfill({ json: products });
    });
  }
}
