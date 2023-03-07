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
import { NetworkType, PublicAccount } from 'bitxor-sdk';
import { OptionsResolver } from '../options-resolver';
import { OptionalPublicKeyValidator, PublicKeyValidator } from '../validators/publicKey.validator';
import { Resolver } from './resolver';

/**
 * Public key resolver
 */
export class PublicKeyResolver implements Resolver {
    /**
     * Resolves a public key provided by the user.
     * @param {Options} options - Command options.
     * @param {NetworkType} networkType - The network type.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<PublicAccount>}
     */
    async resolve(options: Options, networkType: NetworkType, altText?: string, altKey?: string): Promise<PublicAccount> {
        const resolution = await OptionsResolver(
            options,
            altKey ? altKey : 'publicKey',
            () => undefined,
            altText ? altText : 'Enter the account public key:',
            'text',
            new PublicKeyValidator(networkType),
        );
        return PublicAccount.createFromPublicKey(resolution, networkType);
    }
}

export class OptionalPublicKeyResolver implements Resolver {
    /**
     * Resolves a public key provided by the user.
     * @param {Options} options - Command options.
     * @param {NetworkType} networkType - The network type.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<PublicAccount>}
     */
    async resolve(options: Options, networkType: NetworkType, altText?: string, altKey?: string): Promise<PublicAccount | null> {
        const resolution = await OptionsResolver(
            options,
            altKey ? altKey : 'publicKey',
            () => undefined,
            altText ? altText : 'Enter the account public key:',
            'text',
            new OptionalPublicKeyValidator(networkType),
        );
        if (!resolution) {
            return null;
        }
        return PublicAccount.createFromPublicKey(resolution, networkType);
    }
}
