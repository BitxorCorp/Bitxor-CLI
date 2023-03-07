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

import { TokenDefinitionTransaction, TokenFlags, TokenNonce, NetworkType, UInt64 } from 'bitxor-sdk';
import { tokenId1 } from '../tokens.mock';
import { createDeadline } from './deadline.mock';

export const unsignedTokenDefinition1 = TokenDefinitionTransaction.create(
    createDeadline(),
    new TokenNonce(new Uint8Array([0xe6, 0xde, 0x84, 0xb8])), // nonce
    tokenId1, // ID
    TokenFlags.create(true, true, true),
    3,
    UInt64.fromUint(1000),
    NetworkType.TEST_NET,
);
