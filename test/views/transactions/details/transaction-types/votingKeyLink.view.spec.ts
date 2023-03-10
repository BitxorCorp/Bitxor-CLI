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
import { LinkAction } from 'bitxor-sdk';
import { VotingKeyLinkView } from '../../../../../src/views/transactions/details/transaction-types';
import { unsignedVotingKeyLink1 } from '../../../../mocks/transactions/votingKeyLink.mock';

describe('VotingKeyLinkView', () => {
    it('should return a view', () => {
        const view = VotingKeyLinkView.get(unsignedVotingKeyLink1);
        expect(view['Action']).equal(LinkAction[LinkAction.Link]);
        expect(view['Linked key']).equal('0'.repeat(64));
        expect(view['Start epoch']).equal('1');
        expect(view['End epoch']).equal('2');
    });
});
