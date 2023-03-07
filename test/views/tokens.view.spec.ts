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
import { TokensView } from '../../src/views/tokens.view';
import { token1, token2, tokenId1, tokenId2 } from '../mocks/tokens.mock';
import { namespaceId1, namespaceId2, namespaceId3 } from '../mocks/namespaces.mock';

describe('Tokens view', () => {
    it('get should return formatted tokens', () => {
        expect(TokensView.get([token1, token2])).deep.equal({
            'Token (1/2)': '1 D525AD41D95FCF29',
            'Token (2/2)': '1,234,567,890 BitxorBXR (E74B99BA41F4AFEE)',
        });
    });

    it('getTokenLabel should return labels for token Id and namespaceId', () => {
        expect(TokensView.getTokenLabel(tokenId1)).equal(tokenId1.toHex());
        expect(TokensView.getTokenLabel(tokenId2)).equal(tokenId2.toHex());
        expect(TokensView.getTokenLabel(namespaceId1)).equal('BitxorBXR (E74B99BA41F4AFEE)');
        expect(TokensView.getTokenLabel(namespaceId2)).equal('alice (9CF66FB0CFEED2E0)');
        expect(TokensView.getTokenLabel(namespaceId3)).equal('bob (AE7CBE4B2C3F3AB7)');
    });
});
