/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { createAction, props } from '@ngrx/store';
import { Recommendation } from '@models/recommendation';

export const loadRecommendations = createAction('[Recommendation] Load Recommendations');

export const loadRecommendationsSuccess = createAction(
  '[Recommendation] Load Recommendations Success',
  props<{ recommendations: Recommendation[] }>()
);

export const loadRecommendationsFailed = createAction(
  '[Recommendation] Load Recommendations Failed'
);
