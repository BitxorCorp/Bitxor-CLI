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
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { HeightResolver } from '../../resolvers/height.resolver';
import { FormatterService } from '../../services/formatter.service';
import { StatementsView } from '../../views/statements/statements.view';

export class CommandOptions extends ProfileOptions {
    @option({
        flag: 'h',
        description: 'Block height.',
    })
    height: string;
}

@command({
    description: 'Get the receipts triggered for a given block height',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const height = await new HeightResolver().resolve(options);

        this.spinner.start();
        const receiptHttp = profile.repositoryFactory.createReceiptRepository();
        receiptHttp.searchReceipts({ height }).subscribe(
            (statement: any) => {
                this.spinner.stop();
                new StatementsView(statement).print();
            },
            (err: any) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
