/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { test, expect } from '@playwright/test';
import { ProductMasterPage } from '../page-objects/product-master.po';
import { ProductDetailPage } from '../page-objects/product-detail.po';
import { ProductMock } from '../mocks/products.mocks';

test.describe('Product master page', () => {
  let masterPage: ProductMasterPage;
  let detailPage: ProductDetailPage;
  let productMock: ProductMock;

  test.beforeEach(async ({ page }) => {
    masterPage = new ProductMasterPage(page);
    detailPage = new ProductDetailPage(page);
    productMock = new ProductMock(page);
  });

  test('should load the products correctly', async () => {
    await productMock.mockProducts([
      {
        id: 99,
        title: 'Test Product',
        image: 'assets/product-images/ice_waffle.jpg',
        price: '299€',
        description: 'Test Description',
      },
    ]);
    await masterPage.navigateTo();

    const productName = 'Test Product';
    const productImage = await masterPage.getProductImageByName(productName);

    await productImage?.click();

    expect(await detailPage.getTitle()).toEqual(productName);
  });
});
