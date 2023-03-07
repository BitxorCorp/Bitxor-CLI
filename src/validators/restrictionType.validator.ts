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
import { AddressRestrictionFlag, TokenRestrictionFlag, TokenRestrictionType, OperationRestrictionFlag } from 'bitxor-sdk';

/**
 * Validator of token restriction type
 */
export class RestrictionTokenTypeValidator implements Validator<string> {
    /**
     * Validates if a token restriction type is valid.
     * @param {number} value - Token restriction type.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        const keys = Object.keys(TokenRestrictionType).filter((key) => Number.isNaN(parseFloat(key)));
        return keys.includes(value) ? true : 'TokenRestrictionType must be one of (' + keys + ').';
    }
}

/**
 * Validator of account restriction address flag
 */
export class RestrictionAccountAddressFlagValidator implements Validator<string> {
    /**
     * Validates if an account restriction address flag is valid.
     * @param {number} value - account address restriction flag.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        const keys = Object.keys(AddressRestrictionFlag).filter((key) => Number.isNaN(parseFloat(key)));
        return keys.includes(value) ? true : 'AddressRestrictionFlag must be one of (' + keys + ').';
    }
}

/**
 * Validator of account restriction token flag
 */
export class RestrictionAccountTokenFlagValidator implements Validator<string> {
    /**
     * Validates if an account restriction token flag is valid.
     * @param {number} value - account token restriction flag.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        const keys = Object.keys(TokenRestrictionFlag).filter((key) => Number.isNaN(parseFloat(key)));
        return keys.includes(value) ? true : 'TokenRestrictionFlag must be one of (' + keys + ').';
    }
}

/**
 * Validator of account restriction operation flag
 */
export class RestrictionAccountOperationFlagValidator implements Validator<string> {
    /**
     * Validates if an account restriction operation flag is valid.
     * @param {number} value - account operation restriction flag.
     * @returns {true | string}
     */
    validate(value: string): boolean | string {
        const keys = Object.keys(OperationRestrictionFlag).filter((key) => Number.isNaN(parseFloat(key)));
        return keys.includes(value) ? true : 'OperationRestrictionFlag must be one of (' + keys + ')';
    }
}
