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

import * as updateNotifier from 'update-notifier';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../../package.json');
export const description = `Bitxor CLI v${pkg.version}`;

updateNotifier({
    pkg,
    // check every day
    updateCheckInterval: 1000 * 60 * 60 * 24,
    shouldNotifyInNpmScript: true,
}).notify();

export const subcommands = [
    {
        name: 'account',
        brief: 'Get account related information',
    },
    {
        name: 'block',
        brief: 'Get block related information',
    },
    {
        name: 'chain',
        brief: 'Get chain related information',
    },
    {
        name: 'converter',
        brief: 'Convert between data types',
    },
    {
        name: 'metadata',
        brief: 'Get metadata related information',
    },
    {
        name: 'monitor',
        brief: 'Monitor blocks, transactions and errors',
    },
    {
        name: 'token',
        brief: 'Get token related information',
    },
    {
        name: 'namespace',
        brief: 'Get namespace related information',
    },
    {
        name: 'node',
        brief: 'Get node related information',
    },
    {
        name: 'profile',
        brief: 'Manage profiles',
    },
    {
        name: 'restriction',
        brief: 'Get restrictions related information',
    },
    {
        name: 'transaction',
        brief: 'Announce transactions',
    },
];
