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
import { AddressRestrictionFlag, TokenRestrictionFlag, OperationRestrictionFlag } from 'bitxor-sdk';
import { OptionsChoiceResolver } from '../options-resolver';
import {
    RestrictionAccountAddressFlagValidator,
    RestrictionAccountTokenFlagValidator,
    RestrictionAccountOperationFlagValidator,
} from '../validators/restrictionType.validator';
import { Resolver } from './resolver';

/**
 * Restriction account address flags resolver
 */
export class RestrictionAccountAddressFlagsResolver implements Resolver {
    /**
     * Resolves a restriction account address flag provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<number>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<number> {
        const choices = Object.keys(AddressRestrictionFlag)
            .filter((key) => Number.isNaN(parseFloat(key)))
            .map((string) => ({
                title: string,
                value: AddressRestrictionFlag[string as any],
            }));

        const value = +(await OptionsChoiceResolver(
            options,
            altKey ? altKey : 'flags',
            altText ? altText : 'Select the restriction flags:',
            choices,
            'select',
            new RestrictionAccountAddressFlagValidator(),
        ));
        return value;
    }
}

/**
 * Restriction account token flags resolver
 */
export class RestrictionAccountTokenFlagsResolver implements Resolver {
    /**
     * Resolves a restriction account token flag provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<number>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<number> {
        const choices = Object.keys(TokenRestrictionFlag)
            .filter((key) => Number.isNaN(parseFloat(key)))
            .map((string) => ({
                title: string,
                value: TokenRestrictionFlag[string as any],
            }));
        const value = +(await OptionsChoiceResolver(
            options,
            altKey ? altKey : 'flags',
            altText ? altText : 'Select the restriction flags:',
            choices,
            'select',
            new RestrictionAccountTokenFlagValidator(),
        ));
        return value;
    }
}

/**
 * Restriction account operation flags resolver
 */
export class RestrictionAccountOperationFlagsResolver implements Resolver {
    /**
     * Resolves a restriction account operation flag provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<number>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<number> {
        const choices = Object.keys(OperationRestrictionFlag)
            .filter((key) => Number.isNaN(parseFloat(key)))
            .map((string) => ({
                title: string,
                value: OperationRestrictionFlag[string as any],
            }));
        const value = +(await OptionsChoiceResolver(
            options,
            altKey ? altKey : 'flags',
            altText ? altText : 'Select the restriction flags:',
            choices,
            'select',
            new RestrictionAccountOperationFlagValidator(),
        ));
        return value;
    }
}
