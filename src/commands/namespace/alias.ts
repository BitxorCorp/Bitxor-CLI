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
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { NamespaceNameResolver } from '../../resolvers/namespace.resolver';
import { FormatterService } from '../../services/formatter.service';

export class CommandOptions extends ProfileOptions {
    @option({
        flag: 'n',
        description: 'Namespace name.',
    })
    namespaceName: string;
}

@command({
    description: 'Get tokenId or address behind an namespace',
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
        const namespaceHttp = profile.repositoryFactory.createNamespaceRepository();
        forkJoin(
            namespaceHttp.getLinkedTokenId(namespaceId).pipe(catchError(() => of(null))),
            namespaceHttp.getLinkedAddress(namespaceId).pipe(catchError(() => of(null))),
        ).subscribe(
            (res) => {
                this.spinner.stop();
                if (res[0]) {
                    console.log('\n' + res[0].toHex());
                } else if (res[1]) {
                    console.log('\n' + res[1].pretty());
                } else {
                    console.log(FormatterService.error('The namespace is not linked with a token or address'));
                }
            },
            (err) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
