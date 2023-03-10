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
import { command, metadata } from 'clime';
import { MonitorAddressCommand, MonitorAddressOptions } from '../../interfaces/monitor.transaction.command';
import { AddressResolver } from '../../resolvers/address.resolver';
import { FormatterService } from '../../services/formatter.service';
import { TransactionView } from '../../views/transactions/details/transaction.view';

@command({
    description: 'Monitor unconfirmed transactions added',
})
export default class extends MonitorAddressCommand {
    constructor() {
        super();
    }

    @metadata
    async execute(options: MonitorAddressOptions) {
        const profile = this.getProfile(options);
        const address = await new AddressResolver().resolve(options, profile);

        console.log(FormatterService.title('Monitoring ') + `${address.pretty()} using ${profile.url}`);
        const listener = profile.repositoryFactory.createListener();
        listener.open().then(
            () => {
                listener.unconfirmedAdded(address).subscribe(
                    (transaction) => {
                        new TransactionView(transaction, undefined, profile).print();
                    },
                    (err) => {
                        console.log(FormatterService.error(err));
                        listener.close();
                    },
                );
            },
            (err) => {
                this.spinner.stop();
                console.log(FormatterService.error(err));
            },
        );
    }
}
