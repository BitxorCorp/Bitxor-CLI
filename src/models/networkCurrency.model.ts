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
    Token,
    TokenDefinitionTransaction,
    NamespaceId,
    NamespaceRegistrationTransaction,
    NamespaceRegistrationType,
    Transaction,
    UInt64,
} from 'bitxor-sdk';

export interface NetworkCurrencyDTO {
    namespaceId: string;
    divisibility: number;
}

export class NetworkCurrency {
    /**
     * Creates a network currency from a network currency DTO
     * @static
     * @param {NetworkCurrencyDTO} networkCurrencyDTO
     * @returns {NetworkCurrency}
     */
    public static createFromDTO(networkCurrencyDTO: NetworkCurrencyDTO): NetworkCurrency {
        return new NetworkCurrency(new NamespaceId(networkCurrencyDTO.namespaceId), networkCurrencyDTO.divisibility);
    }

    /**
     * Creates a NetworkCurrency from the first block transactions
     * @static
     * @param {Transaction[]} transactions
     * @returns {NetworkCurrency}
     */
    public static createFromFirstBlockTransactions(transactions: Transaction[]): NetworkCurrency {
        // read first token definition transaction
        const tokenDefinitionTx = transactions.find((tx) => tx instanceof TokenDefinitionTransaction) as TokenDefinitionTransaction;

        if (tokenDefinitionTx === undefined) {
            throw new Error('token definition transaction not found');
        }

        // read first root namespace
        const rootNamespaceTx = transactions.find(
            (tx) => tx instanceof NamespaceRegistrationTransaction && tx.registrationType === NamespaceRegistrationType.RootNamespace,
        ) as NamespaceRegistrationTransaction;

        if (rootNamespaceTx === undefined) {
            throw new Error('root namespace creation transaction not found');
        }

        // read sub namespace
        const subNamespaceTx = transactions.find(
            (tx) =>
                tx instanceof NamespaceRegistrationTransaction &&
                tx.registrationType === NamespaceRegistrationType.SubNamespace &&
                tx.parentId &&
                tx.parentId.equals(rootNamespaceTx.namespaceId),
        ) as NamespaceRegistrationTransaction;

        if (rootNamespaceTx === undefined) {
            throw new Error('sub namespace creation transaction was not found');
        }

        // build network token name
        const tokenName = [rootNamespaceTx.namespaceName, subNamespaceTx.namespaceName].join('.');

        return new NetworkCurrency(new NamespaceId(tokenName), tokenDefinitionTx.divisibility);
    }

    /**
     *Creates an instance of NetworkCurrency.
     * @param {NamespaceId} namespaceId
     * @param {number} divisibility
     */
    private constructor(public readonly namespaceId: NamespaceId, public readonly divisibility: number) {}

    /**
     * Creates a network currency DTO
     * @returns {NetworkCurrencyDTO}
     */
    public toDTO(): NetworkCurrencyDTO {
        const id = this.namespaceId.fullName ? this.namespaceId.fullName : this.namespaceId.toHex();
        return { namespaceId: id, divisibility: this.divisibility };
    }

    /**
     * Creates a token given a relative amount
     * @param {(number | string)} amount
     * @returns {Token}
     */
    public createRelative(amount: number | string): Token {
        const theAmount = Number(amount);
        if (Number.isNaN(theAmount)) {
            throw new Error('The provided amount is invalid');
        }
        if (!(theAmount > 0)) {
            throw new Error('The provided amount should be greater than 0');
        }
        const absoluteAmount = theAmount * Math.pow(10, this.divisibility);
        return new Token(this.namespaceId, UInt64.fromUint(absoluteAmount));
    }
}
