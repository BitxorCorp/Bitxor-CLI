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
import { Token, TokenFlags, TokenId, NamespaceId } from 'bitxor-sdk';
import { OptionsConfirmResolver, OptionsResolver } from '../options-resolver';
import { TokenService } from '../services/token.service';
import { TokensValidator } from '../validators/token.validator';
import { TokenIdAliasValidator, TokenIdValidator } from '../validators/tokenId.validator';
import { Resolver } from './resolver';

/**
 * TokenId resolver
 */
export class TokenIdResolver implements Resolver {
    /**
     * Resolves a token id provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<TokenId>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<TokenId> {
        const resolution = await OptionsResolver(
            options,
            altKey ? altKey : 'tokenId',
            () => undefined,
            altText ? altText : 'Enter the token id in hexadecimal format:',
            'text',
            new TokenIdValidator(),
        );
        return new TokenId(resolution);
    }
}

/**
 * TokenId alias resolver
 */
export class TokenIdAliasResolver implements Resolver {
    /**
     * Resolves a token id alias provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<TokenId | NamespaceId>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<TokenId | NamespaceId> {
        const resolution = await OptionsResolver(
            options,
            altKey ? altKey : 'tokenId',
            () => undefined,
            altText ? altText : 'Enter the token id or alias:',
            'text',
            new TokenIdAliasValidator(),
        );
        return TokenService.getTokenId(resolution);
    }

    /**
     * Resolves an optional token id or alias provided by the user.
     * @param {any} options - Command options.
     * @param {string} altKey - Alternative key.
     * @param {TokenId | NamespaceId} defaultValue - Default value.
     */
    optionalResolve(options: any, altKey?: string, defaultValue?: string): TokenId | NamespaceId {
        const key = altKey ? altKey : 'referenceTokenId';
        if (defaultValue) {
            options[key] = options[key] ? options[key] : defaultValue;
        }
        new TokenIdAliasValidator().validate(options[key]);
        return TokenService.getTokenId(options[key]);
    }
}

/**
 * Tokens resolver
 */
export class TokensResolver implements Resolver {
    /**
     * Resolves a set of tokens provided by the user.
     * @param {Options} options - Command options.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<Token[]>}
     */
    async resolve(options: Options, altText?: string, altKey?: string): Promise<Token[]> {
        const resolution = await OptionsResolver(
            options,
            altKey ? altKey : 'tokens',
            () => undefined,
            altText
                ? altText
                : 'Tokens to transfer in the format (tokenId(hex)|@aliasName)::absoluteAmount,' +
                      ' (Ex: sending 1 BitxorBXR, @BitxorBXR::1000000). Add multiple tokens separated by commas:',
            'text',
            new TokensValidator(),
        );
        return resolution ? TokenService.getTokens(resolution) : [];
    }
}

/**
 * Tokens flags resolver
 */
export class TokenFlagsResolver implements Resolver {
    /**
     * Resolves token flags by the user.
     * @param {Options} options - Command options.
     * @returns {Promise<TokenFlags>}
     */
    async resolve(options: Options): Promise<TokenFlags> {
        return TokenFlags.create(
            await OptionsConfirmResolver(options, 'supplyMutable', 'Do you want this token to have a mutable supply?'),
            await OptionsConfirmResolver(options, 'transferable', 'Do you want this token to be transferable?'),
            await OptionsConfirmResolver(options, 'restrictable', 'Do you want this token to be restrictable?'),
        );
    }
}
