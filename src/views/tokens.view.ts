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

import { Token, TokenId, NamespaceId } from 'bitxor-sdk';
import { NamespacesView } from './namespaces.view';
import { CellRecord } from './transactions/details/transaction.view';

export class TokensView {
    /**
     * Transforms tokens into CellRecords to be used in view tables
     * @static
     * @param {Token[]} tokens
     * @returns {CellRecord}
     */
    static get(tokens: Token[]): CellRecord {
        return new TokensView(tokens).render();
    }

    /**
     * Renders a string to be displayed in the view
     * Renders a namespace name if available (eg: BitxorBXR (E74B99BA41F4AFEE))
     * @static
     * @param {(TokenId | NamespaceId)} id
     * @returns {string}
     */
    static getTokenLabel(id: TokenId | NamespaceId): string {
        if (id instanceof TokenId) {
            return id.toHex();
        }
        return NamespacesView.getNamespaceLabel(id);
    }

    /**
     * Creates an instance of TokensView.
     * @param {Token[]} tokens
     */
    private constructor(private readonly tokens: Token[]) {}

    /**
     * Transforms tokens into CellRecords to be used in view tables
     * @private
     * @returns {CellRecord}
     */
    private render(): CellRecord {
        return this.tokens.reduce(
            (acc, token, index) => ({
                ...acc,
                ...this.getRenderedToken(token, index),
            }),
            {},
        );
    }

    /**
     * Transforms a token array into a CellRecord to be used in view tables
     * @private
     * @param {Token} token
     * @param {number} index
     * @returns {CellRecord}
     */
    private getRenderedToken(token: Token, index: number): CellRecord {
        const tokenPrefix = TokensView.getTokenLabel(token.id);
        const positionInList = `${index + 1}/${this.tokens.length}`;
        const amount = token.amount.compact().toLocaleString();

        return {
            [`Token (${positionInList})`]: `${amount} ${tokenPrefix}`,
        };
    }
}
