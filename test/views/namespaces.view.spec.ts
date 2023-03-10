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
import { NamespacesView } from '../../src/views/namespaces.view';
import { namespaceId1, namespaceId2, namespaceId3 } from '../mocks/namespaces.mock';

describe('Tokens view', () => {
    it('getTokenLabel should return labels for token Id and namespaceId', () => {
        expect(NamespacesView.getNamespaceLabel(namespaceId1)).equal('BitxorBXR (E74B99BA41F4AFEE)');
        expect(NamespacesView.getNamespaceLabel(namespaceId2)).equal('alice (9CF66FB0CFEED2E0)');
        expect(NamespacesView.getNamespaceLabel(namespaceId3)).equal('bob (AE7CBE4B2C3F3AB7)');
    });
});
