/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@models/product';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  // for mocking, we're using a local json file.
  // in a real-world app this would be a REST ressource on a server
  private readonly productUrl = '/assets/products.json';
  private readonly productOderUrl = (id) => `/assets/product/${id}`;

  constructor(private httpClient: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  getProduct(id: number | string): Observable<Product> {
    return this.httpClient
      .get<Product[]>(this.productUrl)
      .pipe(map((products) => products.find((product) => product.id === id)));
  }

  orderProduct(id: number | string): Observable<void> {
    return this.httpClient
      .post<void>(this.productOderUrl(id), {})
      .pipe(catchError(() => of(undefined)));
  }
}
