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
import { Convert } from 'bitxor-sdk';
import { TokenMetadataView } from '../../../../../src/views/transactions/details/transaction-types';
import { account1 } from '../../../../mocks/accounts.mock';
import { tokenId1 } from '../../../../mocks/tokens.mock';
import { unsignedTokenMetadata1 } from '../../../../mocks/transactions/tokenMetadata.mock';

describe('TokenMetadataView', () => {
    it('should return a view', () => {
        const view = TokenMetadataView.get(unsignedTokenMetadata1);
        expect(view['Target address']).equal(account1.address.pretty());
        expect(view['Scoped metadata key']).equal('00000000000003E8');
        expect(view['Target token Id']).equal(tokenId1.toHex());
        expect(view['Value size delta']).equal('1');
        expect(view['Value']).equal(new Uint8Array(10));
    });
});
