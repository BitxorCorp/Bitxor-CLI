/*
 *
 * Copyright 2023-present Bitxor Community
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Options } from 'clime';
import { TransactionType } from 'bitxor-sdk';
import { OptionsChoiceResolver } from '../options-resolver';
import { AggregateTypeValidator } from '../validators/aggregateType.validator';
import { Resolver } from './resolver';

/**
 * Aggregate type resolver
 */
export class AggregateTypeResolver implements Resolver {
    /**
     * Resolves a aggregate type provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<number>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<number> {
        const choices = [
            { title: 'AGGREGATE_BONDED', value: TransactionType.AGGREGATE_BONDED },
            { title: 'AGGREGATE_COMPLETE', value: TransactionType.AGGREGATE_COMPLETE },
        ];

        const value = +(await OptionsChoiceResolver(
            options,
            altKey ? altKey : 'aggregateType',
            altText ? altText : 'Choose an aggregate type:',
            choices,
            'select',
            new AggregateTypeValidator(),
        ));
        return value;
    }
}
