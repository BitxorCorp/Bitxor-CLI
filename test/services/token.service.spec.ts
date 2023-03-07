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
import { TokenId, NamespaceId, UInt64 } from 'bitxor-sdk';
import { TokenService } from '../../src/services/token.service';

describe('Token service', () => {
    it('should create token service', () => {
        expect(new TokenService()).to.not.be.equal(undefined);
    });

    it('getTokenId should return an alias', () => {
        const rawTokenId = '@foo';
        expect(TokenService.getTokenId(rawTokenId)).to.be.instanceOf(NamespaceId);
    });

    it('getTokenId (hex) should return a TokenId', () => {
        const rawTokenId = '175785202c44e5db';
        expect(TokenService.getTokenId(rawTokenId)).to.be.instanceOf(TokenId);
    });

    it('getTokens should return an array of tokens', () => {
        const rawTokens = '175785202c44e5db::1,@foo2::2';
        const tokens = TokenService.getTokens(rawTokens);
        expect(tokens.length).to.be.equal(2);
        expect(tokens[0].id.toHex()).to.be.equal('175785202c44e5db'.toUpperCase());
        expect(tokens[0].amount.toHex()).to.be.equal(UInt64.fromUint(1).toHex());
        expect(tokens[1].id.toHex()).to.be.equal(new NamespaceId('foo2').toHex());
        expect(tokens[1].amount.toHex()).to.be.equal(UInt64.fromUint(2).toHex());
    });

    it('validate should not throw exception (alias)', () => {
        const string = '@foo::1';
        expect(TokenService.validate(string)).to.be.equal(true);
    });

    it('validate should not throw exception (hex)', () => {
        const string = '175785202c44e5db::1';
        expect(TokenService.validate(string)).to.be.equal(true);
    });

    it('validate should throw exception', () => {
        const string = 'a::1';
        expect(TokenService.validate(string)).to.equal(
            'Token should be in the format (tokenId(hex)|@aliasName)::absoluteAmount,' +
                ' (Ex: sending 1 BitxorBXR, @BitxorBXR::1000000)',
        );
    });

    it('validate should throw exception (format)', () => {
        const string = 'a::1';
        expect(TokenService.validate(string)).to.equal(
            'Token should be in the format (tokenId(hex)|@aliasName)::absoluteAmount,' +
                ' (Ex: sending 1 BitxorBXR, @BitxorBXR::1000000)',
        );
    });
});
