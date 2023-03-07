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
import { TokenGlobalRestrictionView } from '../../../../../src/views/transactions/details/transaction-types';
import { tokenId1, tokenId2 } from '../../../../mocks/tokens.mock';
import { unsignedTokenGlobalRestriction1 } from '../../../../mocks/transactions/tokenGlobalRestriction.mock';

describe('TokenGlobalRestrictionView', () => {
    it('should return a view', () => {
        const view = TokenGlobalRestrictionView.get(unsignedTokenGlobalRestriction1);
        expect(view['Token Id']).equal(tokenId1.toHex());
        expect(view['Reference token Id']).equal(tokenId2.toHex());
        expect(view['Restriction key']).equal('0000000000000001');
        expect(view['Previous restriction value']).equal('9');
        expect(view['Previous restriction type']).equal('EQ');
        expect(view['New restriction value']).equal('8');
        expect(view['New restriction type']).equal('GE');
    });
});
