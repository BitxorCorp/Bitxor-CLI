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
import { UInt64 } from 'bitxor-sdk';

/**
 * Validator of token restriction key
 */
export class TokenRestrictionKeyValidator implements Validator<string> {
    /**
     * Validates if a token restriction key is valid.
     * @param {string} value - Token restriction key.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        try {
            UInt64.fromNumericString(value);
        } catch (err) {
            return 'Restriction key must be a valid UInt64 string';
        }
        return true;
    }
}
