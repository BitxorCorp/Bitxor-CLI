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

import { AccountRestrictionTransaction, TokenRestrictionFlag, NetworkType } from 'bitxor-sdk';
import { tokenId1, tokenId2 } from '../tokens.mock';
import { namespaceId1 } from '../namespaces.mock';
import { createDeadline } from './deadline.mock';

export const unsignedAccountTokenRestriction1 = AccountRestrictionTransaction.createTokenRestrictionModificationTransaction(
    createDeadline(),
    TokenRestrictionFlag.AllowToken,
    [tokenId1],
    [tokenId2, namespaceId1],
    NetworkType.TEST_NET,
);
