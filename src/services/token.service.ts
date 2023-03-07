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

import { Token, TokenId, NamespaceId, UInt64 } from 'bitxor-sdk';

/**
 * Token service
 */
export class TokenService {
    public static ALIAS_TAG = '@';

    /**
     * Validates a token object from a string.
     * @param {string} value - Token in the form tokenId::amount.
     * @returns {true | string}
     */
    static validate(value: string): boolean | string {
        let valid = true;
        const tokenParts = value.split('::');
        try {
            if (isNaN(+tokenParts[1])) {
                valid = false;
            }
            const ignored = new Token(this.getTokenId(tokenParts[0]), UInt64.fromUint(+tokenParts[1]));
        } catch (err) {
            valid = false;
        }
        return valid
            ? valid
            : 'Token should be in the format (tokenId(hex)|@aliasName)::absoluteAmount,' +
                  ' (Ex: sending 1 BitxorBXR, @BitxorBXR::1000000)';
    }

    /**
     * Creates a TokenId object from a string.
     * @param {string} rawTokenId - Token identifier. If starts with "@", it is a namespace name.
     * @returns {TokenId | NamespaceId}
     */
    static getTokenId(rawTokenId: string): TokenId | NamespaceId {
        let tokenId: TokenId | NamespaceId;
        if (rawTokenId.charAt(0) === TokenService.ALIAS_TAG) {
            tokenId = new NamespaceId(rawTokenId.substring(1));
        } else {
            tokenId = new TokenId(rawTokenId);
        }
        return tokenId;
    }

    /**
     * Creates an array of tokens from a string.
     * @param {string} rawTokens - Tokens in the form tokenId::amount, separated by commas.
     * @returns {Token[]}
     */
    static getTokens(rawTokens: string): Token[] {
        const tokens: Token[] = [];
        const tokensData = rawTokens.split(',');
        tokensData.forEach((tokenData) => {
            const tokenParts = tokenData.split('::');
            tokens.push(new Token(this.getTokenId(tokenParts[0]), UInt64.fromNumericString(tokenParts[1])));
        });
        return tokens;
    }
}
