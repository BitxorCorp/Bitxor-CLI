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
import { NamespaceId, UInt64 } from 'bitxor-sdk';
import { Validator } from './validator';

/**
 * Namespace id validator
 */
export class NamespaceIdValidator implements Validator<string> {
    /**
     * Validates a namespace id.
     * @param {string} value - NamespaceId in hexadecimal.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        try {
            const namespaceIdUInt64 = UInt64.fromHex(value);
            const ignored = new NamespaceId([namespaceIdUInt64.lower, namespaceIdUInt64.higher]);
        } catch (err) {
            return 'Enter a namespace id in hexadecimal format. Example: 85BBEA6CC462B244';
        }
        return true;
    }
}
