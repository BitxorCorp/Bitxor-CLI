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
import { KeyResolver } from '../../resolvers/key.resolver';
import { MaxFeeResolver } from '../../resolvers/maxFee.resolver';
import { TokenIdAliasResolver } from '../../resolvers/token.resolver';
import { RestrictionTypeResolver } from '../../resolvers/restrictionType.resolver';
import { RestrictionValueResolver } from '../../resolvers/restrictionValue.resolver';
import { TransactionSignatureOptions } from '../../services/transaction.signature.service';

export class CommandOptions extends AnnounceTransactionsOptions {
    @option({
        flag: 'm',
        description: 'Token identifier or @alias being restricted.',
    })
    tokenId: string;

    @option({
        flag: 'r',
        description: '(Optional) Identifier of the token providing the restriction key.',
        default: '0000000000000000',
    })
    referenceTokenId: string;

    @option({
        flag: 'k',
        description: 'Restriction key relative to the reference token identifier.',
    })
    restrictionKey: string;

    @option({
        flag: 'V',
        description: 'New restriction value.',
    })
    newRestrictionValue: string;

    @option({
        flag: 'T',
        description: 'New restriction type. (' + 'NONE, ' + 'EQ, ' + 'GE, ' + 'GT, ' + 'LE, ' + 'LT, ' + 'NE)',
    })
    newRestrictionType: string;
}

@command({
    description: 'Set a global restriction to a token (requires internet)',
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
        const newRestrictionType = await new RestrictionTypeResolver().resolve(options);
        const restrictionKey = await new KeyResolver().resolve(options, undefined, 'restrictionKey');
        const newRestrictionValue = await new RestrictionValueResolver().resolve(options);
        const maxFee = await new MaxFeeResolver().resolve(options);
        const referenceTokenId = new TokenIdAliasResolver().optionalResolve(options);

        const repositoryFactory = profile.repositoryFactory;
        const restrictionTokenHttp = repositoryFactory.createRestrictionTokenRepository();
        const namespaceHttp = repositoryFactory.createNamespaceRepository();
        const tokenRestrictionTransactionService = new TokenRestrictionTransactionService(restrictionTokenHttp, namespaceHttp);

        const multisigSigner = await this.getMultisigSigner(options);

        const transaction = await tokenRestrictionTransactionService
            .createTokenGlobalRestrictionTransaction(
                Deadline.create(profile.epochAdjustment),
                profile.networkType,
                tokenId,
                restrictionKey,
                newRestrictionValue,
                newRestrictionType,
                referenceTokenId,
                maxFee,
            )
            .toPromise();

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
