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
import { from } from 'rxjs';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';
import { TokenAddressRestriction, TokenAddressRestrictionItem } from 'bitxor-sdk';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { AddressResolver } from '../../resolvers/address.resolver';
import { TokenIdResolver } from '../../resolvers/token.resolver';
import { FormatterService } from '../../services/formatter.service';

export class CommandOptions extends ProfileOptions {
    @option({
        flag: 'a',
        description: 'Account address.',
    })
    address: string;

    @option({
        flag: 'm',
        description: 'Token id in hexadecimal format.',
    })
    tokenId: string;
}

export class TokenAddressRestrictionsTable {
    private readonly table: HorizontalTable;

    constructor(public readonly tokenAddressRestrictions: TokenAddressRestriction[]) {
        this.table = new Table({
            style: { head: ['cyan'] },
            head: ['Type', 'Value'],
        }) as HorizontalTable;

        tokenAddressRestrictions.forEach((tokenRestriction) => {
            tokenRestriction.restrictions.forEach((value: TokenAddressRestrictionItem) => {
                this.table.push(['Key', value.key.toString()], ['Value', value.restrictionValue.toString()]);
            });
        });
    }

    toString(): string {
        let text = '';
        text += FormatterService.title('Token Address Restrictions');
        text += '\n' + this.table.toString();
        return text;
    }
}

@command({
    description: 'Fetch token restrictions assigned to an address',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const address = await new AddressResolver().resolve(options, profile);
        const tokenId = await new TokenIdResolver().resolve(options);

        this.spinner.start();
        const restrictionHttp = profile.repositoryFactory.createRestrictionTokenRepository();

        // Should we load all?
        const criteria = { tokenId, targetAddress: address };

        const observable = restrictionHttp.search(criteria).pipe(
            mergeMap((page) => {
                return from(page.data);
            }),
            filter((m) => m instanceof TokenAddressRestriction),
            map((m) => m as TokenAddressRestriction),
            toArray(),
        );

        observable.subscribe(
            (tokenRestrictions: TokenAddressRestriction[]) => {
                this.spinner.stop();
                if (tokenRestrictions.length > 0) {
                    console.log(new TokenAddressRestrictionsTable(tokenRestrictions).toString());
                } else {
                    console.log(FormatterService.error('The address does not have token address restrictions assigned'));
                }
            },
            (err: any) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
