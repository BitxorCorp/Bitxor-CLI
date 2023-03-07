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
import { Deadline, TokenRestrictionTransactionService } from 'bitxor-sdk';
import { AnnounceTransactionsCommand } from '../../interfaces/announce.transactions.command';
import { AnnounceTransactionsOptions } from '../../interfaces/announce.transactions.options';
import { UnresolvedAddressResolver } from '../../resolvers/address.resolver';
import { KeyResolver } from '../../resolvers/key.resolver';
import { MaxFeeResolver } from '../../resolvers/maxFee.resolver';
import { TokenIdAliasResolver } from '../../resolvers/token.resolver';
import { RestrictionValueResolver } from '../../resolvers/restrictionValue.resolver';
import { TransactionSignatureOptions } from '../../services/transaction.signature.service';

export class CommandOptions extends AnnounceTransactionsOptions {
    @option({
        flag: 'm',
        description: 'Token identifier or @alias being restricted.',
    })
    tokenId: string;

    @option({
        flag: 'a',
        description: 'Address or @alias being restricted.',
    })
    targetAddress: string;

    @option({
        flag: 'k',
        description: 'Restriction key.',
    })
    restrictionKey: string;

    @option({
        flag: 'V',
        description: 'New restriction value.',
    })
    newRestrictionValue: string;
}

@command({
    description: 'Set a token restriction to an specific address (requires internet)',
})
export default class extends AnnounceTransactionsCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const account = await this.getSigningAccount(profile, options);
        const tokenId = await new TokenIdAliasResolver().resolve(options);
        const targetAddress = await new UnresolvedAddressResolver().resolve(
            options,
            undefined,
            'Enter the restricted target address or @alias:',
            'targetAddress',
        );
        const restrictionKey = await new KeyResolver().resolve(options, undefined, 'restrictionKey');
        const restrictionValue = await new RestrictionValueResolver().resolve(options);
        const maxFee = await new MaxFeeResolver().resolve(options);
        const multisigSigner = await this.getMultisigSigner(options);

        const repositoryFactory = profile.repositoryFactory;
        const restrictionTokenHttp = repositoryFactory.createRestrictionTokenRepository();
        const namespaceHttp = repositoryFactory.createNamespaceRepository();
        const tokenRestrictionTransactionService = new TokenRestrictionTransactionService(restrictionTokenHttp, namespaceHttp);

        const tokenAddressRestrictionTransaction = await tokenRestrictionTransactionService
            .createTokenAddressRestrictionTransaction(
                Deadline.create(profile.epochAdjustment),
                profile.networkType,
                tokenId,
                restrictionKey,
                targetAddress,
                restrictionValue,
                maxFee,
            )
            .toPromise();

        const signatureOptions: TransactionSignatureOptions = {
            account,
            transactions: [tokenAddressRestrictionTransaction],
            maxFee,
            multisigSigner,
        };

        const signedTransactions = await this.signTransactions(signatureOptions, options);
        this.announceTransactions(options, signedTransactions);
    }
}
