/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderRoutingModule } from './order.routing-module';

@NgModule({
  imports: [CommonModule, OrderRoutingModule],
  declarations: [OrderConfirmationComponent],
})
export class OrderModule {}
