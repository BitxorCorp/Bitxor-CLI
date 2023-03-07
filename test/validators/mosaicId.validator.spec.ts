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

import { expect } from 'chai';
import { TokenIdAliasValidator, TokenIdValidator } from '../../src/validators/tokenId.validator';

describe('Token id validator', () => {
    it('default case', () => {
        const value = '941299B2B7E1291C';
        expect(new TokenIdValidator().validate(value)).to.be.equal(true);
    });

    it('should throw error if tokenId is not valid', () => {
        const value = 'test';
        expect(typeof new TokenIdValidator().validate(value)).to.be.equal('string');
    });
});

describe('token alias validator', () => {
    it('default case', () => {
        const tokenId = '941299B2B7E1291C';
        expect(new TokenIdAliasValidator().validate(tokenId)).to.be.equal(true);
    });

    it('should throw error if tokenId is not valid', () => {
        const value = 'test';
        expect(typeof new TokenIdValidator().validate(value)).to.be.equal('string');
    });

    it('should throw error if alias is not valid (special char)', () => {
        const alias = '@bitxorbxr';
        expect(new TokenIdAliasValidator().validate(alias)).to.be.equal(true);
    });

    it('should throw error if tokenId is not valid (uppercase)', () => {
        const value = '@myOwnAlias.name';
        expect(typeof new TokenIdValidator().validate(value)).to.be.equal('string');
    });
});
