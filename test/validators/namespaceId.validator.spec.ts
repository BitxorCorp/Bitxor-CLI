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
import { NamespaceIdValidator } from '../../src/validators/namespaceId.validator';

describe('Token id validator', () => {
    it('default case ', () => {
        const value = '85BBEA6CC462B244';
        expect(new NamespaceIdValidator().validate(value)).to.be.equal(true);
    });

    it('should throw error if namespaceId is not a valid UInt64 value', () => {
        const value = 'test';
        expect(typeof new NamespaceIdValidator().validate(value)).to.be.equal('string');
    });
});
