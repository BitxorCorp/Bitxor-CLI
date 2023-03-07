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

import { TokenAddressRestrictionTransaction } from 'bitxor-sdk';
import { RecipientsView } from '../../../recipients.view';
import { CellRecord } from '../transaction.view';

export class TokenAddressRestrictionView {
    /**
     * @static
     * @param {TokenAddressRestrictionTransaction} tx
     * @returns {CellRecord}
     */
    static get(tx: TokenAddressRestrictionTransaction): CellRecord {
        return {
            'Token id': tx.tokenId.toHex(),
            'Restriction key': tx.restrictionKey.toHex(),
            'Target address': RecipientsView.get(tx.targetAddress),
            'Previous restriction value': tx.previousRestrictionValue.toString(),
            'New restriction value': tx.newRestrictionValue.toString(),
        };
    }
}
