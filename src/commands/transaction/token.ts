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

import { command, metadata, option } from 'clime';
import {
    Deadline,
    TokenDefinitionTransaction,
    TokenId,
    TokenNonce,
    TokenSupplyChangeAction,
    TokenSupplyChangeTransaction,
    UInt64,
} from 'bitxor-sdk';
import { AnnounceTransactionsCommand } from '../../interfaces/announce.transactions.command';
import { AnnounceTransactionsOptions } from '../../interfaces/announce.transactions.options';
import { OptionsConfirmResolver } from '../../options-resolver';
import { AmountResolver } from '../../resolvers/amount.resolver';
import { DivisibilityResolver } from '../../resolvers/divisibility.resolver';
import { DurationResolver } from '../../resolvers/duration.resolver';
import { MaxFeeResolver } from '../../resolvers/maxFee.resolver';
import { TokenFlagsResolver } from '../../resolvers/token.resolver';
import { TransactionSignatureOptions } from '../../services/transaction.signature.service';

export class CommandOptions extends AnnounceTransactionsOptions {
    @option({
        flag: 'a',
        description: 'Initial supply of tokens.',
    })
    amount: string;

    @option({
        flag: 't',
        description: '(Optional) Token transferable.',
        toggle: true,
    })
    transferable: any;

    @option({
        flag: 's',
        description: '(Optional) Token supply mutable.',
        toggle: true,
    })
    supplyMutable: any;

    @option({
        flag: 'r',
        description: '(Optional) Token restrictable.',
        toggle: true,
    })
    restrictable: any;

    @option({
        flag: 'd',
        description: 'Token divisibility, from 0 to 6.',
    })
    divisibility: number;

    @option({
        flag: 'u',
        description: 'Token duration in amount of blocks.',
    })
    duration: string;

    @option({
        flag: 'n',
        description: '(Optional) Token non-expiring.',
        toggle: true,
    })
    nonExpiring: any;
}

@command({
    description: 'Create a new token',
})
export default class extends AnnounceTransactionsCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const account = await this.getSigningAccount(profile, options);

        const nonce = TokenNonce.createRandom();
        let blocksDuration;
        if (!(await OptionsConfirmResolver(options, 'nonExpiring', 'Do you want a non-expiring token?'))) {
            blocksDuration = await new DurationResolver().resolve(options);
        }
        const divisibility = await new DivisibilityResolver().resolve(options);
        const tokenFlags = await new TokenFlagsResolver().resolve(options);
        const amount = await new AmountResolver().resolve(options, 'Amount of tokens units to create: ');
        const maxFee = await new MaxFeeResolver().resolve(options);
        const multisigSigner = await this.getMultisigSigner(options);

        const signerAddress = multisigSigner ? multisigSigner.info.accountAddress : account.address;

        const tokenDefinition = TokenDefinitionTransaction.create(
            Deadline.create(profile.epochAdjustment),
            nonce,
            TokenId.createFromNonce(nonce, signerAddress),
            tokenFlags,
            divisibility,
            blocksDuration ? blocksDuration : UInt64.fromUint(0),
            profile.networkType,
        );

        const tokenSupplyChange = TokenSupplyChangeTransaction.create(
            Deadline.create(profile.epochAdjustment),
            tokenDefinition.tokenId,
            TokenSupplyChangeAction.Increase,
            amount,
            profile.networkType,
        );

        const signatureOptions: TransactionSignatureOptions = {
            account,
            transactions: [tokenDefinition, tokenSupplyChange],
            maxFee,
            multisigSigner,
            isAggregate: true,
            isAggregateBonded: signerAddress.plain() !== account.address.plain(),
        };

        const signedTransactions = await this.signTransactions(signatureOptions, options);
        this.announceTransactions(options, signedTransactions);
    }
}
