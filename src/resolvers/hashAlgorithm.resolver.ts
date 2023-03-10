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
import { LockHashAlgorithm } from 'bitxor-sdk';
import { OptionsChoiceResolver } from '../options-resolver';
import { HashAlgorithmValidator } from '../validators/hashAlgorithm.validator';
import { Resolver } from './resolver';

/**
 * Link hashAlgorithm resolver
 */
export class HashAlgorithmResolver implements Resolver {
    /**
     * Resolves an hashAlgorithm provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<number>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<number> {
        const choices = Object.keys(LockHashAlgorithm)
            .filter((key) => Number.isNaN(parseFloat(key)))
            .map((string) => ({
                title: string,
                value: LockHashAlgorithm[string as any],
            }));

        const value = +(await OptionsChoiceResolver(
            options,
            altKey ? altKey : 'hashAlgorithm',
            altText ? altText : 'Select the algorithm used to hash the proof:',
            choices,
            'select',
            new HashAlgorithmValidator(),
        ));
        return value;
    }
}
