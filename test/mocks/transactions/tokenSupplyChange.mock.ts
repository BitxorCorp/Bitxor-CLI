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

import { TokenSupplyChangeAction, TokenSupplyChangeTransaction, NetworkType, UInt64 } from 'bitxor-sdk';
import { tokenId1 } from '../tokens.mock';
import { createDeadline } from './deadline.mock';

export const unsignedTokenSupplyChange1 = TokenSupplyChangeTransaction.create(
    createDeadline(),
    tokenId1,
    TokenSupplyChangeAction.Increase,
    UInt64.fromUint(10),
    NetworkType.TEST_NET,
    new UInt64([1, 0]),
);