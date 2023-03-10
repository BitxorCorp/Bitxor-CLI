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
import { Metadata, Page } from 'bitxor-sdk';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { NamespaceNameResolver } from '../../resolvers/namespace.resolver';
import { FormatterService } from '../../services/formatter.service';
import { MetadataEntryTable } from './account';

export class CommandOptions extends ProfileOptions {
    @option({
        flag: 'n',
        description: 'Target namespace name.',
    })
    namespaceName: string;
}

@command({
    description: 'Fetch metadata entries from an namespace',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: CommandOptions) {
        const profile = this.getProfile(options);
        const namespaceId = await new NamespaceNameResolver().resolve(options);

        this.spinner.start();
        const metadataHttp = profile.repositoryFactory.createMetadataRepository();
        metadataHttp.search({ targetId: namespaceId }).subscribe(
            (metadataEntries: Page<Metadata>) => {
                this.spinner.stop();
                if (metadataEntries.pageSize > 0) {
                    metadataEntries.data.map((entry: Metadata) => {
                        console.log(new MetadataEntryTable(entry.metadataEntry).toString());
                    });
                } else {
                    console.log(FormatterService.error('The namespace does not have metadata entries assigned'));
                }
            },
            (err: any) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
