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
import { TransactionStatus } from 'bitxor-sdk';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { Profile } from '../../models/profile.model';
import { HashResolver } from '../../resolvers/hash.resolver';
import { FormatterService } from '../../services/formatter.service';

export class CommandOptions extends ProfileOptions {
    @option({
        flag: 'h',
        description: 'Transaction hash.',
    })
    hash: string;
}

export class TransactionStatusTable {
    private readonly table: HorizontalTable;
    constructor(public readonly status: TransactionStatus, profile: Profile) {
        this.table = new Table({
            style: { head: ['cyan'] },
            head: ['Property', 'Value'],
        }) as HorizontalTable;
        this.table.push(['Group', status.group], ['Hash', status.hash]);
        if (status.code) {
            this.table.push(['Status Code', status.code]);
        }
        if (status.deadline) {
            const localDateTime = status.deadline.toLocalDateTime(profile.epochAdjustment);
            this.table.push(['Deadline', `${localDateTime.toLocalDate()} ${localDateTime.toLocalTime()}`]);
        }
        if (status.height) {
            this.table.push(['Height', status.height.toString()]);
        }
    }

    toString(): string {
        let text = '';
        text += FormatterService.title('Transaction Status');
        text += '\n' + this.table.toString();
        return text;
    }
}

@command({
    description: 'Fetch transaction status',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const hash = await new HashResolver().resolve(options);

        this.spinner.start();
        const transactionStatusHttp = profile.repositoryFactory.createTransactionStatusRepository();
        transactionStatusHttp.getTransactionStatus(hash).subscribe(
            (status) => {
                this.spinner.stop();
                console.log(new TransactionStatusTable(status, profile).toString());
            },
            (err) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
