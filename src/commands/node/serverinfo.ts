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
import { command, metadata } from 'clime';
import { ServerInfo } from 'bitxor-sdk';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { FormatterService } from '../../services/formatter.service';

export class ServerInfoTable {
    private readonly table: HorizontalTable;
    constructor(public readonly serverInfo: ServerInfo) {
        this.table = new Table({
            style: { head: ['cyan'] },
            head: ['Property', 'Value'],
        }) as HorizontalTable;
        this.table.push(['Rest Version', serverInfo.restVersion], ['SDK Version', serverInfo.sdkVersion]);
    }

    toString(): string {
        let text = '';
        text += FormatterService.title('Server Information');
        text += '\n' + this.table.toString();
        return text;
    }
}

@command({
    description: 'Get information about the REST instance',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    execute(options: ProfileOptions) {
        const profile = this.getProfile(options);

        this.spinner.start();
        const nodeHttp = profile.repositoryFactory.createNodeRepository();
        nodeHttp.getServerInfo().subscribe(
            (serverInfo) => {
                this.spinner.stop();
                console.log(new ServerInfoTable(serverInfo).toString());
            },
            (err) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
