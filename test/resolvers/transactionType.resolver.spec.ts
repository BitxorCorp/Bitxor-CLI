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
import { TransactionType } from 'bitxor-sdk';
import { TransactionTypeResolver } from '../../src/resolvers/transactionType.resolver';

describe('Transaction type resolver', () => {
    it('should return Transfer Transaction', async () => {
        const transactionType = 'TRANSFER';
        const options = { transactionType } as any;
        expect(await new TransactionTypeResolver().resolve(options)).to.be.equal(TransactionType.TRANSFER);
    });

    it('should change key', async () => {
        const key = 'TRANSFER';
        const options = { key } as any;
        expect(await new TransactionTypeResolver().resolve(options, 'altText', 'key')).to.be.equal(TransactionType.TRANSFER);
    });
});
