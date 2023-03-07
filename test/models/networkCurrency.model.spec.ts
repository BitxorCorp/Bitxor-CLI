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
import { Token, NamespaceId, UInt64 } from 'bitxor-sdk';
import { NetworkCurrency } from '../../src/models/networkCurrency.model';
import { block1Transactions } from '../mocks/transactions/block1Transactions.mock';

const mockNetworkCurrency = NetworkCurrency.createFromDTO({
    namespaceId: 'BitxorBXR',
    divisibility: 6,
});

describe('Network currency', () => {
    it('createFromDTO instantiate the network currency', () => {
        const networkCurrency = NetworkCurrency.createFromDTO({
            namespaceId: 'BitxorBXR',
            divisibility: 6,
        });
        expect(networkCurrency).instanceOf(NetworkCurrency);
        expect(networkCurrency.namespaceId).deep.equal(new NamespaceId('BitxorBXR'));
        expect(networkCurrency.divisibility).equal(6);
    });

    it('createFromFirstBlockTransactions instantiates a network currency', () => {
        const networkCurrency = NetworkCurrency.createFromFirstBlockTransactions(block1Transactions);
        expect(networkCurrency).instanceOf(NetworkCurrency);
        expect(networkCurrency.namespaceId).deep.equal(new NamespaceId('BitxorBXR'));
        expect(networkCurrency.divisibility).equal(6);
    });

    it('toDTO creates a network currency DTO', () => {
        const DTO = { namespaceId: 'BitxorBXR', divisibility: 6 };
        const networkCurrency = NetworkCurrency.createFromDTO(DTO);
        expect(networkCurrency.toDTO()).deep.equal(DTO);
    });

    it('createRelative should return a token when provided a number', () => {
        const relativeAmount = 123456;
        const absoluteAmount = relativeAmount * Math.pow(10, 6);
        const expectedToken = new Token(new NamespaceId('BitxorBXR'), UInt64.fromUint(absoluteAmount));
        const token = mockNetworkCurrency.createRelative(relativeAmount);
        expect(token).deep.equal(expectedToken);
        expect(token.amount.compact()).equals(123_456_000_000);
    });

    it('createRelative should return a token when provided a number as a string', () => {
        const relativeAmount = 123456;
        const relativeAmountAsString = '123456';
        const absoluteAmount = relativeAmount * Math.pow(10, 6);
        const expectedToken = new Token(new NamespaceId('BitxorBXR'), UInt64.fromUint(absoluteAmount));
        const token = mockNetworkCurrency.createRelative(relativeAmountAsString);
        expect(token).deep.equal(expectedToken);
        expect(token.amount.compact()).equals(123_456_000_000);
    });

    it('createRelative should throw when provided an invalid number', () => {
        expect(() => mockNetworkCurrency.createRelative('not an amount')).to.throw();
        expect(() => mockNetworkCurrency.createRelative(-1)).to.throw();
    });
});
