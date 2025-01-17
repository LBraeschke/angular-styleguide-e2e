/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { OrderModule } from './order.module';

describe('OrderModule', () => {
  let confirmationModule: OrderModule;

  beforeEach(() => {
    confirmationModule = new OrderModule();
  });

  it('should create an instance', () => {
    expect(confirmationModule).toBeTruthy();
  });
});
