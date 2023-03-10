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

import {
    Address,
    TokenId,
    NamespaceId,
    ResolutionEntry,
    ResolutionStatement,
    ResolutionType,
    UnresolvedAddress,
    UnresolvedTokenId,
} from 'bitxor-sdk';
import { RecipientsView } from '../recipients.view';
import { CellRecord } from '../transactions/details/transaction.view';
import { AbstractStatementView } from './abstractStatementView.view';

export class ResolutionStatementViews extends AbstractStatementView {
    constructor(private readonly statements: ResolutionStatement<UnresolvedAddress | UnresolvedTokenId, Address | TokenId>[]) {
        super();
    }

    /**
     * Renders cell records
     * @returns {CellRecord[]}
     */
    public render(): CellRecord[][] | null {
        if (!this.statements.length) {
            return null;
        }

        const statementTypeLabel = ResolutionType[this.statements[0].resolutionType];

        return this.statements.map(({ height, unresolved, resolutionEntries }, index, self) => [
            this.getSectionTitle(`${statementTypeLabel} statement ${index + 1} of ${self.length}`),
            { Height: height.compact() },
            { Unresolved: this.getUnresolved(unresolved) },
            ...this.renderResolutionEntries(resolutionEntries),
        ]);
    }

    /**
     * Renders resolution entries
     * @private
     * @param {ResolutionEntry[]} entries
     * @returns {CellRecord[]}
     */
    private renderResolutionEntries(entries: ResolutionEntry<Address | TokenId>[]): CellRecord[] {
        return entries
            .map((entry, index, self) => this.renderResolutionEntry(entry, index, self.length))
            .reduce((acc, entry) => [...acc, ...entry], []);
    }

    /**
     * Renders resolution a entry
     * @private
     * @param {ResolutionEntry} entry
     * @param {number} index
     * @param {number} numberOfReceipts
     * @returns {CellRecord[]}
     */
    private renderResolutionEntry(entry: ResolutionEntry<Address | TokenId>, index: number, numberOfReceipts: number): CellRecord[] {
        return [
            this.getSectionTitle(`Resolution ${index + 1} of ${numberOfReceipts}`),
            { Resolved: this.getUnresolved(entry.resolved) },
            { Source: `Primary Id: ${entry.source.primaryId}, Secondary Id: ${entry.source.secondaryId}` },
        ];
    }

    private getUnresolved(entry: Address | TokenId | NamespaceId): string {
        if (entry instanceof TokenId) {
            return entry.toHex();
        }
        return RecipientsView.get(entry);
    }
}
