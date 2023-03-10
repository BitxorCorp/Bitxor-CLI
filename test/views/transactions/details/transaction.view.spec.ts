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
import { assert, expect } from 'chai';
import { TransactionView } from '../../../../src/views/transactions/details/transaction.view';
import { mockPrivateKeyProfile1 } from '../../../mocks/profiles/profile.mock';
import { unsignedTransfer2 } from '../../../mocks/transactions/index';

describe('Transaction view', () => {
    it('TransactionView render should return a non-empty array', () => {
        const transactionView = new TransactionView(unsignedTransfer2, undefined, mockPrivateKeyProfile1).render();
        assert.typeOf(transactionView, 'array', 'transactionView.render is an array');
        expect(transactionView.length).equal(8);
    });
});
