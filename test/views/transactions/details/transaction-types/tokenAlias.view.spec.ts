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
import { AliasAction } from 'bitxor-sdk';
import { TokenAliasView } from '../../../../../src/views/transactions/details/transaction-types';
import { tokenId1 } from '../../../../mocks/tokens.mock';
import { unsignedTokenAlias1 } from '../../../../mocks/transactions/tokenAlias.mock';

describe('TokenAliasView', () => {
    it('should return a view', () => {
        const view = TokenAliasView.get(unsignedTokenAlias1);
        expect(view['Alias action']).equal(AliasAction[AliasAction.Link]);
        expect(view['Token Id']).equal(tokenId1.toHex());
        expect(view['Namespace Id']).equal('BitxorBXR (E74B99BA41F4AFEE)');
    });
});
