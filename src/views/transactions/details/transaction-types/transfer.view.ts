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

import { TransferTransaction } from 'bitxor-sdk';
import { TokensView } from '../../../tokens.view';
import { RecipientsView } from '../../../recipients.view';
import { CellRecord } from '../transaction.view';

export class TransferView {
    /**
     * @static
     * @param {TransferTransaction} tx
     * @returns {CellRecord}
     */
    static get(tx: TransferTransaction): CellRecord {
        return new TransferView(tx).render();
    }

    /**
     * Creates an instance of TransferView.
     * @param {TransferTransaction} tx
     */
    private constructor(private readonly tx: TransferTransaction) {}

    /**
     * @private
     * @returns {CellRecord}
     */
    private render(): CellRecord {
        return {
            Recipient: this.getUnresolvedAddress(),
            Message: this.tx.message.payload || 'N/A',
            ...TokensView.get(this.tx.tokens),
        };
    }

    /**
     * @private
     * @returns {string}
     */
    private getUnresolvedAddress(): string {
        if (!this.tx.recipientAddress) {
            return '';
        }
        return RecipientsView.get(this.tx.recipientAddress);
    }
}
