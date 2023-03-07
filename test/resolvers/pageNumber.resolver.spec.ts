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
import { PageNumberResolver } from '../../src/resolvers/pageNumber.resolver';

describe('Page number resolver', () => {
    it('should return page number', async () => {
        const pageNumber = 1;
        const options = { pageNumber } as any;
        expect(await new PageNumberResolver().resolve(options)).to.be.equal(pageNumber);
    });

    it('should change key', async () => {
        const key = 1;
        const options = { key } as any;
        expect(await new PageNumberResolver().resolve(options, 'altText', 'key')).to.be.equal(key);
    });
});
