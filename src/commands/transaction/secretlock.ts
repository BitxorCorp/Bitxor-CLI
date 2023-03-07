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
import { Deadline, Token, SecretLockTransaction } from 'bitxor-sdk';
import { AnnounceTransactionsCommand } from '../../interfaces/announce.transactions.command';
import { AnnounceTransactionsOptions } from '../../interfaces/announce.transactions.options';
import { UnresolvedAddressResolver } from '../../resolvers/address.resolver';
import { AmountResolver } from '../../resolvers/amount.resolver';
import { DurationResolver } from '../../resolvers/duration.resolver';
import { HashAlgorithmResolver } from '../../resolvers/hashAlgorithm.resolver';
import { MaxFeeResolver } from '../../resolvers/maxFee.resolver';
import { TokenIdAliasResolver } from '../../resolvers/token.resolver';
import { SecretResolver } from '../../resolvers/secret.resolver';
import { TransactionSignatureOptions } from '../../services/transaction.signature.service';

export class CommandOptions extends AnnounceTransactionsOptions {
    @option({
        description: 'Locked token identifier or @alias.',
        flag: 'm',
    })
    tokenId: string;

    @option({
        description: 'Amount of token units to lock.',
        flag: 'a',
    })
    amount: string;

    @option({
        description:
            'Number of blocks for which a lock should be valid. ' +
            'Duration is allowed to lie up to 30 days. If reached, the tokens will be returned to the initiator.',
        flag: 'd',
    })
    duration: string;

    @option({
        description: 'Proof hashed in hexadecimal format.',
        flag: 's',
    })
    secret: string;

    @option({
        description: 'Algorithm used to hash the proof (Op_Sha3_256, Op_Hash_160, Op_Hash_256).',
        flag: 'H',
    })
    hashAlgorithm: string;

    @option({
        description: 'Address or @alias that receives the funds once unlocked.',
        flag: 'r',
    })
    recipientAddress: string;
}

@command({
    description: 'Announce a secret lock transaction',
})
export default class extends AnnounceTransactionsCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const account = await this.getSigningAccount(profile, options);
        const tokenId = await new TokenIdAliasResolver().resolve(options, 'Enter the locked token identifier or alias:');
        const amount = await new AmountResolver().resolve(options, 'Enter the absolute amount of token units to lock:');
        const recipientAddress = await new UnresolvedAddressResolver().resolve(
            options,
            undefined,
            'Enter the address (or @alias) that receives the funds once unlocked:',
            'recipientAddress',
        );
        const duration = await new DurationResolver().resolve(options, 'Enter the number of blocks for which a lock should be valid:');
        const secret = await new SecretResolver().resolve(options);
        const hashAlgorithm = await new HashAlgorithmResolver().resolve(options);
        const maxFee = await new MaxFeeResolver().resolve(options);

        const transaction = SecretLockTransaction.create(
            Deadline.create(profile.epochAdjustment),
            new Token(tokenId, amount),
            duration,
            hashAlgorithm,
            secret,
            recipientAddress,
            profile.networkType,
            maxFee,
        );

        const multisigSigner = await this.getMultisigSigner(options);

        const signatureOptions: TransactionSignatureOptions = {
            account,
            transactions: [transaction],
            maxFee,
            multisigSigner,
        };

        const signedTransactions = await this.signTransactions(signatureOptions, options);
        this.announceTransactions(options, signedTransactions);
    }
}
