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
import { TokenSupplyChangeView } from '../../../../../src/views/transactions/details/transaction-types';
import { tokenId1 } from '../../../../mocks/tokens.mock';
import { unsignedTokenSupplyChange1 } from '../../../../mocks/transactions/tokenSupplyChange.mock';

describe('TokenSupplyChangeView', () => {
    it('should return a view', () => {
        const view = TokenSupplyChangeView.get(unsignedTokenSupplyChange1);
        expect(view['Token Id']).equal(tokenId1.toHex());
        expect(view['Direction']).equal('Increase supply');
        expect(view['Delta']).equal('10');
    });
});
