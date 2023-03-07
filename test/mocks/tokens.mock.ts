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

import { Token, TokenId, UInt64 } from 'bitxor-sdk';
import { namespaceId1 } from './namespaces.mock';

export const tokenId1 = new TokenId([3646934825, 3576016193]);
export const tokenId2 = new TokenId([2262289484, 3405110546]);
export const tokenId3 = new TokenId('504677C3281108DB');

export const token1 = new Token(tokenId1, new UInt64([1, 0]));
export const token2 = new Token(namespaceId1, UInt64.fromUint(1234567890));
