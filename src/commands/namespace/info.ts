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
import { NamespaceInfo } from 'bitxor-sdk';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { NamespaceIdResolver, NamespaceNameResolver } from '../../resolvers/namespace.resolver';
import { FormatterService } from '../../services/formatter.service';

export class CommandOptions extends ProfileOptions {
    @option({
        flag: 'n',
        description: 'Namespace name. Example: BitxorBXR',
    })
    namespaceName: string;

    @option({
        flag: 'h',
        description: 'Namespace id in hexadecimal.',
    })
    namespaceId: string;
}

export class NamespaceInfoTable {
    private readonly table: HorizontalTable;
    constructor(public readonly namespaceInfo: NamespaceInfo) {
        this.table = new Table({
            style: { head: ['cyan'] },
            head: ['Property', 'Value'],
        }) as HorizontalTable;
        this.table.push(
            ['Id', namespaceInfo.id.toHex()],
            ['Registration Type', namespaceInfo.isRoot() ? 'Root Namespace' : 'Sub Namespace'],
            ['Owner', namespaceInfo.ownerAddress.pretty()],
            ['Start Height', namespaceInfo.startHeight.toString()],
            ['End Height', namespaceInfo.endHeight.toString()],
        );
        if (namespaceInfo.isSubnamespace()) {
            this.table.push(['Parent Id', namespaceInfo.parentNamespaceId().toHex()]);
        }
        if (namespaceInfo.hasAlias()) {
            if (namespaceInfo.alias.address) {
                this.table.push(['Alias Type', 'Address'], ['Alias Address', namespaceInfo.alias.address.pretty()]);
            } else if (namespaceInfo.alias.tokenId) {
                this.table.push(['Alias Type', 'TokenId'], ['Alias TokenId', namespaceInfo.alias.tokenId.toHex()]);
            }
        }
    }

    toString(): string {
        let text = '';
        text += FormatterService.title('Namespace Information');
        text += '\n' + this.table.toString();
        return text;
    }
}

@command({
    description: 'Fetch namespace info',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const namespaceId = options.namespaceName
            ? await new NamespaceNameResolver().resolve(options)
            : await new NamespaceIdResolver().resolve(options);

        this.spinner.start();
        const namespaceHttp = profile.repositoryFactory.createNamespaceRepository();
        namespaceHttp.getNamespace(namespaceId).subscribe(
            (namespaceInfo) => {
                this.spinner.stop();
                console.log(new NamespaceInfoTable(namespaceInfo).toString());
            },
            (err) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
