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
import { TokenGlobalRestriction, TokenGlobalRestrictionItem, TokenRestrictionType } from 'bitxor-sdk';
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

export class TokenGlobalRestrictionsTable {
    private readonly table: HorizontalTable;

    constructor(public readonly tokenGlobalRestrictions: TokenGlobalRestriction[]) {
        this.table = new Table({
            style: { head: ['cyan'] },
            head: ['Restriction Key', 'Reference TokenId', 'Restriction Type', 'Restriction Value'],
        }) as HorizontalTable;

        tokenGlobalRestrictions.forEach((tokenRestriction) => {
            tokenRestriction.restrictions.forEach((value: TokenGlobalRestrictionItem) => {
                value = value as TokenGlobalRestrictionItem;
                this.table.push([
                    value.key.toString(),
                    value.referenceTokenId.toHex(),
                    TokenRestrictionType[value.restrictionType],
                    value.restrictionValue.toString(),
                ]);
            });
        });
    }

    toString(): string {
        let text = '';
        text += FormatterService.title('Token Global Restrictions');
        text += '\n' + this.table.toString();
        return text;
    }
}

@command({
    description: 'Fetch global restrictions assigned to a token',
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
        const restrictionHttp = profile.repositoryFactory.createRestrictionTokenRepository();

        // Should we load all?
        const criteria = { tokenId };
        const observable = restrictionHttp.search(criteria).pipe(
            mergeMap((page) => {
                return from(page.data);
            }),
            filter((m) => m instanceof TokenGlobalRestriction),
            map((m) => m as TokenGlobalRestriction),
            toArray(),
        );

        observable.subscribe(
            (tokenRestrictions: TokenGlobalRestriction[]) => {
                this.spinner.stop();
                if (tokenRestrictions.length > 0) {
                    console.log(new TokenGlobalRestrictionsTable(tokenRestrictions).toString());
                } else {
                    console.log(FormatterService.error('The tokenId does not have token global restrictions assigned'));
                }
            },
            (err: any) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
