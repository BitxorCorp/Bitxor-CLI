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
import { Address } from 'bitxor-sdk';
import { TransferView } from '../../../../../src/views/transactions/details/transaction-types/transfer.view';
import { unsignedTransfer1, unsignedTransfer2 } from '../../../../mocks/transactions/transfer.mock';

describe('TransferView', () => {
    it('should return a view of a transfer', () => {
        const view = TransferView.get(unsignedTransfer1);
        const expectedRecipientAddress = unsignedTransfer1.recipientAddress as Address;
        expect(view['Recipient']).deep.equal(expectedRecipientAddress.pretty());
        expect(view['Message']).equal(unsignedTransfer1.message.payload);
        expect(view['Token (1/1)']).equal('1 D525AD41D95FCF29');
    });

    it('should return a view of a transfer with namespaces as recipient and token', () => {
        const view = TransferView.get(unsignedTransfer2);
        expect(view['Recipient']).equal('alice (9CF66FB0CFEED2E0)');
        expect(view['Message']).equal(unsignedTransfer1.message.payload);
        expect(view['Token (1/2)']).equal('1 D525AD41D95FCF29');
        expect(view['Token (2/2)']).equal('1,234,567,890 BitxorBXR (E74B99BA41F4AFEE)');
    });
});
