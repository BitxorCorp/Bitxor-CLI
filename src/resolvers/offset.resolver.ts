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
import { OptionsResolver } from '../options-resolver';
import { Resolver } from './resolver';

/**
 * Offset resolver
 */
export class OffsetResolver implements Resolver {
    /**
     * Resolves an offset provided by a user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @return {Promise<string>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<string> {
        const value = await OptionsResolver(
            options,
            altKey ? altKey : 'offset',
            () => undefined,
            altText ? altText : 'Enter an offset:',
            'text',
            undefined,
        );
        return value;
    }
}
