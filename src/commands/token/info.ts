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
import * as Table from 'cli-table3';
import { HorizontalTable } from 'cli-table3';
import { command, metadata, option } from 'clime';
import { TokenInfo, TokenService } from 'bitxor-sdk';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { TokenIdResolver } from '../../resolvers/token.resolver';
import { FormatterService } from '../../services/formatter.service';

export class CommandOptions extends ProfileOptions {
    @option({
        flag: 'm',
        description: 'Token id in hexadecimal format.',
    })
    tokenId: string;
}

export class TokenViewTable {
    private readonly table: HorizontalTable;
    constructor(public readonly tokenInfo: TokenInfo) {
        this.table = new Table({
            style: { head: ['cyan'] },
            head: ['Property', 'Value'],
        }) as HorizontalTable;
        this.table.push(
            ['Record Id', tokenInfo.recordId],
            ['Token Id', tokenInfo.id.toHex()],
            ['Divisibility', tokenInfo.divisibility],
            ['Transferable', tokenInfo.isTransferable()],
            ['Supply Mutable', tokenInfo.isSupplyMutable()],
            ['Height', tokenInfo.startHeight.toString()],
            ['Expiration', tokenInfo.duration.compact() === 0 ? 'Never' : tokenInfo.startHeight.add(tokenInfo.duration).toString()],
            ['Owner', tokenInfo.ownerAddress.pretty()],
            ['Supply (Absolute)', tokenInfo.supply.toString()],
            [
                'Supply (Relative)',
                tokenInfo.divisibility === 0
                    ? tokenInfo.supply.compact().toLocaleString()
                    : (tokenInfo.supply.compact() / Math.pow(10, tokenInfo.divisibility)).toLocaleString(),
            ],
        );
    }

    toString(): string {
        let text = '';
        text += FormatterService.title('Token Information');
        text += '\n' + this.table.toString();
        return text;
    }
}

@command({
    description: 'Fetch token info',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const tokenId = await new TokenIdResolver().resolve(options);

        this.spinner.start();
        const repositoryFactory = profile.repositoryFactory;
        const accountHttp = repositoryFactory.createAccountRepository();
        const tokenHttp = repositoryFactory.createTokenRepository();
        const tokenService = new TokenService(accountHttp, tokenHttp);
        tokenService.tokensView([tokenId]).subscribe(
            (tokenViews) => {
                this.spinner.stop();
                if (tokenViews.length === 0) {
                    console.log(FormatterService.error('No token exists with this id ' + tokenId.toHex()));
                } else {
                    console.log(new TokenViewTable(tokenViews[0].tokenInfo).toString());
                }
            },
            (err) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
