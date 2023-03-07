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
import { AccountTokenRestrictionView } from '../../../../../src/views/transactions/details/transaction-types';
import { tokenId1, tokenId2 } from '../../../../mocks/tokens.mock';
import { unsignedAccountTokenRestriction1 } from '../../../../mocks/transactions/accountTokenRestriction.mock';

describe('AccountTokenRestrictionView', () => {
    it('should return a view', () => {
        const view = AccountTokenRestrictionView.get(unsignedAccountTokenRestriction1);
        expect(view['Account restriction flag']).equal('AllowToken');
        expect(view['Addition 1 of 1']).equal(tokenId1.toHex());
        expect(view['Deletion 1 of 2']).equal(tokenId2.toHex());
        expect(view['Deletion 2 of 2']).equal('BitxorBXR (E74B99BA41F4AFEE)');
    });
});
