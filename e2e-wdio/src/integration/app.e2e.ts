/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { productMasterPage } from '../page-objects/product-master.po';
import { setResponseForProducts } from './mock/mock-products';
import { productDetailPage } from '../page-objects/product-detail.po';

describe('Product master page', () => {
  it('should display title', async () => {
    await productMasterPage.navigateTo();

    await expect(productMasterPage.title).toHaveText('GET YOUR ICE CREAM');
  });

  it('should navigate to correct detail page when product was clicked', async () => {
    await setResponseForProducts([
      {
        id: 3,
        title: 'Integration Mint',
        image: 'assets/product-images/mint.jpg',
        price: '1,99€',
        description: 'Mint Chocolate Chip Ice Cream (with Sprinkles). Photo by Austin Kirk',
        imageLicence: 'cc-by',
        imageSource: 'https://www.flickr.com/photos/64441474@N06/13049646504',
      },
    ]);

    await productMasterPage.navigateTo();
    const productName = 'Integration Mint';
    const productImage = await productMasterPage.getProductImageByName(productName);

    await productImage.click();

    await expect(productDetailPage.title).toHaveText(productName);
  });
});
