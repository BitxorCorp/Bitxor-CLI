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
import { LockHashAlgorithm } from 'bitxor-sdk';
import { SecretProofCommandOptions } from '../commands/transaction/secretproof';
import { OptionsResolver } from '../options-resolver';
import { ProofValidator } from '../validators/proof.validator';
import { Resolver } from './resolver';

/**
 * Proof resolver
 */
export class ProofResolver implements Resolver {
    /**
     * Resolves an secret provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<string>}
     */
    async resolve(options: SecretProofCommandOptions, hashType?: LockHashAlgorithm, altText?: string, altKey?: string): Promise<string> {
        const resolution = await OptionsResolver(
            options,
            altKey ? altKey : 'proof',
            () => undefined,
            altText ? altText : 'Enter the original random set of bytes in hexadecimal:',
            'text',
            new ProofValidator(hashType),
        );
        return resolution;
    }
}
