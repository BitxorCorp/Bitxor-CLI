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

import { expect } from 'chai';
import { TransactionURIResolver } from '../../src/resolvers/transactionURI.resolver';

describe('TransactionURI resolver', () => {
    it('should return TransactionURI', async () => {
        const uri = 'web+bitxor://transaction?data=data';
        const options = { uri } as any;
        const transactionURI = await new TransactionURIResolver().resolve(options);
        expect(transactionURI.build()).to.be.equal(uri);
    });
});
