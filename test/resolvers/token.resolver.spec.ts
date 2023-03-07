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
import { NamespaceId } from 'bitxor-sdk';
import { TokenFlagsResolver, TokenIdAliasResolver, TokenIdResolver, TokensResolver } from '../../src/resolvers/token.resolver';

describe('Token id resolver', () => {
    it('should return tokenId', async () => {
        const tokenId = '0DC67FBE1CAD29E3';
        const options = { tokenId } as any;
        expect((await new TokenIdResolver().resolve(options)).toHex()).to.be.equal(tokenId);
    });
});

describe('Token id alias validator', () => {
    it('should return tokenId', async () => {
        const tokenId = '0DC67FBE1CAD29E3';
        const options = { tokenId } as any;
        expect((await new TokenIdAliasResolver().resolve(options)).toHex()).to.be.equal(tokenId);
    });

    it('should return alias', async () => {
        const tokenId = '@test';
        const options = { tokenId } as any;
        expect(await new TokenIdAliasResolver().resolve(options)).to.be.instanceOf(NamespaceId);
    });
});

describe('Tokens resolver', () => {
    it('should return empty list', async () => {
        const tokens = '';
        const options = { tokens } as any;
        const resolution = await new TokensResolver().resolve(options);
        expect(resolution.length).to.be.equal(0);
    });

    it('should return array of tokens', async () => {
        const tokens = '0DC67FBE1CAD29E3::1,@test::2';
        const options = { tokens } as any;
        const resolution = await new TokensResolver().resolve(options);

        expect(resolution[0].id.toHex()).to.be.equal('0DC67FBE1CAD29E3');
        expect(resolution[0].amount.compact()).to.be.equal(1);
        expect(resolution[1].id).to.be.instanceOf(NamespaceId);
        expect(resolution[1].amount.compact()).to.be.equal(2);
    });
});

describe('TokenFlag resolver', () => {
    it('should return token flags', async () => {
        const transferable = true;
        const supplyMutable = true;
        const restrictable = true;
        const options = { transferable, supplyMutable, restrictable } as any;
        const resolution = await new TokenFlagsResolver().resolve(options);

        expect(resolution.transferable).to.be.equal(transferable);
        expect(resolution.supplyMutable).to.be.equal(supplyMutable);
        expect(resolution.restrictable).to.be.equal(restrictable);
    });
});

describe('TokenIdAliasResolver optional resolver', () => {
    it('should return tokenId', () => {
        const referenceTokenId = '0DC67FBE1CAD29E3';
        const options = { referenceTokenId } as any;
        expect(new TokenIdAliasResolver().optionalResolve(options).toHex()).to.be.equal(referenceTokenId);
    });

    it('should return alias', () => {
        const referenceTokenId = '@test';
        const options = { referenceTokenId } as any;
        expect(new TokenIdAliasResolver().optionalResolve(options)).to.be.instanceOf(NamespaceId);
    });

    it('should return default tokenId', () => {
        const defaultTokenId = '0DC67FBE1CAD29E3';
        const referenceTokenId = undefined;
        const options = { referenceTokenId } as any;
        expect(new TokenIdAliasResolver().optionalResolve(options, 'referenceTokenId', '0DC67FBE1CAD29E3').toHex()).to.be.equal(
            defaultTokenId,
        );
    });
});
