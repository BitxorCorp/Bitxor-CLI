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
import { TokenRestrictionType } from 'bitxor-sdk';
import { OptionsChoiceResolver } from '../options-resolver';
import { RestrictionTokenTypeValidator } from '../validators/restrictionType.validator';
import { Resolver } from './resolver';

/**
 * Restriction type resolver
 */
export class RestrictionTypeResolver implements Resolver {
    /**
     * Resolve a restriction type provided by a user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @return {Promise<number>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<number> {
        const choices = Object.keys(TokenRestrictionType)
            .filter((key) => Number.isNaN(parseFloat(key)))
            .map((string) => ({
                title: string,
                value: TokenRestrictionType[string as any],
            }));

        const value = +(await OptionsChoiceResolver(
            options,
            altKey ? altKey : 'newRestrictionType',
            altText ? altText : 'Select the new restriction type:',
            choices,
            'select',
            new RestrictionTokenTypeValidator(),
        ));
        return value;
    }
}
