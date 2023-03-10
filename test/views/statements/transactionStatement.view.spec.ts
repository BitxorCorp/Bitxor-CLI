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
import { TransactionStatementViews } from '../../../src/views/statements/transactionStatements.view';
import { account1, account2 } from '../../mocks/accounts.mock';
import { statement } from '../../mocks/statements.mock';

describe('Transaction Statement Views', () => {
    it('Renders transaction statements', () => {
        const statementsView: any[][] | null = new TransactionStatementViews(statement.transactionStatements).render();
        if (statementsView === null) {
            throw new Error('statementsView should be defined');
        }
        assert.typeOf(statementsView, 'array', 'statementsView.render is an array');

        expect(statementsView[0][0].title.content).equal('Transaction statement 1 of 2');
        expect(statementsView[0][1]).deep.equal({ Height: 1 });
        expect(statementsView[0][2]).deep.equal({ Source: 'Primary Id: 1, Secondary Id: 2' });
        expect(statementsView[0][3].title.content).equal('Transaction receipts');
        expect(statementsView[0][4].title.content).equal('Receipt 1 of 2');
        expect(statementsView[0][5]).deep.equal({ Type: 'Harvest_Fee' });
        expect(statementsView[0][6]).deep.equal({ Size: 'N/A' });
        expect(statementsView[0][7]).deep.equal({ 'Target address': account1.address.pretty() });
        expect(statementsView[0][8]).deep.equal({ TokenId: 'D525AD41D95FCF29' });
        expect(statementsView[0][9]).deep.equal({ Amount: 10 });
        expect(statementsView[0][10].title.content).equal('Receipt 2 of 2');
        expect(statementsView[0][11]).deep.equal({ Type: 'Transaction_Group' });
        expect(statementsView[0][12]).deep.equal({ Size: 'N/A' });
        expect(statementsView[0][13]).deep.equal({ Sender: account1.address.pretty() });
        expect(statementsView[0][14]).deep.equal({ Recipient: account2.address.pretty() });
        expect(statementsView[0][15]).deep.equal({ 'Token Id': 'D525AD41D95FCF29' });
        expect(statementsView[0][16]).deep.equal({ Amount: 2 });

        expect(statementsView[1][0].title.content).equal('Transaction statement 2 of 2');
        expect(statementsView[1][1]).deep.equal({ Height: 2 });
        expect(statementsView[1][2]).deep.equal({ Source: 'Primary Id: 3, Secondary Id: 4' });
        expect(statementsView[1][3].title.content).equal('Transaction receipts');
        expect(statementsView[1][4].title.content).equal('Receipt 1 of 2');
        expect(statementsView[1][5]).deep.equal({ Type: 'Namespace_Expired' });
        expect(statementsView[1][6]).deep.equal({ Size: 'N/A' });
        expect(statementsView[1][7]).deep.equal({ 'Namespace Id': 'E74B99BA41F4AFEE' });
        expect(statementsView[1][8].title.content).equal('Receipt 2 of 2');
        expect(statementsView[1][9]).deep.equal({ Type: 'Inflation' });
        expect(statementsView[1][10]).deep.equal({ Size: 100 });
        expect(statementsView[1][11]).deep.equal({ TokenId: 'D525AD41D95FCF29' });
        expect(statementsView[1][12]).deep.equal({ Amount: 100 });
    });
});
