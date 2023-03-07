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

import { AccountTokenRestrictionTransaction, TokenId, TokenRestrictionFlag, NamespaceId } from 'bitxor-sdk';
import { TokensView } from '../../../tokens.view';
import { CellRecord } from '../transaction.view';

export class AccountTokenRestrictionView {
    /**
     * @static
     * @param {AccountTokenRestrictionTransaction} tx
     * @returns {CellRecord}
     */
    static get(tx: AccountTokenRestrictionTransaction): CellRecord {
        return new AccountTokenRestrictionView(tx).render();
    }

    /**
     * Creates an instance of AccountTokenRestrictionView.
     * @param {AccountTokenRestrictionTransaction} tx
     */
    private constructor(private readonly tx: AccountTokenRestrictionTransaction) {}

    /**
     * @private
     * @returns {CellRecord}
     */
    private render(): CellRecord {
        return {
            'Account restriction flag': TokenRestrictionFlag[this.tx.restrictionFlags],
            ...this.getRestrictions(),
        };
    }

    /**
     * @private
     * @returns {CellRecord}
     */
    private getRestrictions(): CellRecord {
        const numberOfAdditions = this.tx.restrictionAdditions.length;
        const numberOfDeletions = this.tx.restrictionDeletions.length;
        return {
            ...this.tx.restrictionAdditions.reduce(
                (acc, token, index) => ({
                    ...acc,
                    ...this.renderRestriction(token, index, numberOfAdditions, 'Addition'),
                }),
                {},
            ),
            ...this.tx.restrictionDeletions.reduce(
                (acc, token, index) => ({
                    ...acc,
                    ...this.renderRestriction(token, index, numberOfDeletions, 'Deletion'),
                }),
                {},
            ),
        };
    }

    /**
     * @private
     * @param {(TokenId | NamespaceId)} tokenId
     * @param {number} index
     * @param {number} numberOfRestrictions
     * @param {('Addition' | 'Deletion')} additionOrDeletion
     * @returns {CellRecord}
     */
    private renderRestriction(
        tokenId: TokenId | NamespaceId,
        index: number,
        numberOfRestrictions: number,
        additionOrDeletion: 'Addition' | 'Deletion',
    ): CellRecord {
        const key = `${additionOrDeletion} ${index + 1} of ${numberOfRestrictions}`;
        return { [key]: TokensView.getTokenLabel(tokenId) };
    }
}
