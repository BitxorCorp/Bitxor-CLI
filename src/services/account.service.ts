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

import { Network } from 'bitxor-hd-wallets';
import { Account, Address, NamespaceId, NetworkType, UnresolvedAddress } from 'bitxor-sdk';
import { DerivationService } from './derivation.service';

/**
 * Account service
 */
export class AccountService {
    public static ALIAS_TAG = '@';

    /**
     * Gets the address given a raw address.
     * @param {string} rawRecipient -  Address or namespace name. If starts with "@", it is a namespace name.
     * @returns {UnresolvedAddress}
     */
    static getUnresolvedAddress(rawRecipient: string): UnresolvedAddress {
        let recipient: UnresolvedAddress;
        if (rawRecipient.charAt(0) === AccountService.ALIAS_TAG) {
            recipient = new NamespaceId(rawRecipient.substring(1));
        } else {
            recipient = Address.createFromRawAddress(rawRecipient);
        }
        return recipient;
    }

    /**
     * Generates the accounts from given mnemonic
     * @param {string} mnemonic
     * @param {NetworkType} networkType
     * @param {Network} curve
     * @param numOfAccounts
     */
    static generateAccountsFromMnemonic(mnemonic: string, networkType: NetworkType, curve: Network, numOfAccounts = 10): Account[] {
        return [...Array(numOfAccounts).keys()].map((i) => {
            const privateKey = DerivationService.getPrivateKeyFromMnemonicWithCurve(mnemonic, i, networkType, curve);
            return Account.createFromPrivateKey(privateKey, networkType);
        });
    }
}
