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
import { Validator } from 'clime';
import { TokenService } from '../services/token.service';

/**
 * Token validator
 */
export class TokenValidator implements Validator<string> {
    /**
     * Validates if a token object can be created from a string.
     * @param {string} value - Token in the form tokenId::amount.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        return TokenService.validate(value);
    }
}

/**
 * Tokens validator
 */
export class TokensValidator implements Validator<string> {
    /**
     * Validates if an array of token objects can be created from a string.
     * @param {string} value - Tokens in the form tokenId::amount, separated by commas.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        let error = '';
        if (value) {
            const tokens = value.split(',');
            tokens.forEach((token) => {
                const validation = TokenService.validate(token);
                if (typeof validation === 'string') {
                    error = validation;
                }
            });
        }
        return error ? error : true;
    }
}
