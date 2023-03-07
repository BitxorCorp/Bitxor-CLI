/*
 * Copyright 2023 Bitxor Community
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
 */
import { ExpectedError } from 'clime';
import {
    Account,
    Address,
    AggregateTransaction,
    Convert,
    KeyPair,
    Message,
    NetworkType,
    PublicAccount,
    SignedTransaction,
    Transaction,
    UInt64,
} from 'bitxor-sdk';

/**
 * Basic read only information of an account.
 */
export interface SigningAccountInfo {
    readonly publicKey: string;
    readonly address: Address;
    readonly publicAccount: PublicAccount;
}

/**
 * An account that knows how to asynchronously sign and co-sign transactions
 */
export interface SigningAccount extends SigningAccountInfo {
    cosignTransaction(transaction: Transaction, transactionHash: string): Promise<string>;
    sign(transaction: Transaction, generationHash: string): Promise<SignedTransaction>;
    encryptMessage(rawMessage: string, recipientPublicAccount: PublicAccount): Promise<Message>;
    close(): Promise<void>;
}

/**
 * Basic signing account that adapts the sdk's account.
 */
export class PrivateKeyAccount implements SigningAccount {
    public readonly address: Address;
    public readonly publicKey: string;
    public readonly publicAccount: PublicAccount;
    constructor(private readonly account: Account) {
        this.address = account.address;
        this.publicKey = account.publicAccount.publicKey;
        this.publicAccount = account.publicAccount;
    }

    async cosignTransaction(transaction: Transaction, transactionHash: string): Promise<string> {
        const keyPairEncoded = KeyPair.createKeyPairFromPrivateKeyString(this.account.privateKey);
        return Convert.uint8ToHex(KeyPair.sign(keyPairEncoded, Convert.hexToUint8(transactionHash)));
    }

    async sign(transaction: Transaction, generationHash: string): Promise<SignedTransaction> {
        return this.account.sign(transaction, generationHash);
    }

    encryptMessage(rawMessage: string, recipientPublicAccount: PublicAccount): Promise<Message> {
        return Promise.resolve(this.account.encryptMessage(rawMessage, recipientPublicAccount));
    }

    close(): Promise<void> {
        //nothing to close
        return Promise.resolve();
    }
}



/**
 * Utility object to sign transactions asynchronously
 */
export class SigningUtils {
    public static async signTransactionWithCosignatories(
        initiatorAccount: SigningAccount,
        transaction: AggregateTransaction,
        cosignatories: SigningAccount[],
        generationHash: string,
    ): Promise<SignedTransaction> {
        const signedTransaction = await initiatorAccount.sign(transaction, generationHash);
        let signedPayload = signedTransaction.payload;
        for (const cosigner of cosignatories) {
            const signature = await cosigner.cosignTransaction(transaction, signedTransaction.hash);
            Convert.validateHexString(signature, 128, 'Cosignature is not valid hex!');
            signedPayload += UInt64.fromUint(0).toHex() + cosigner.publicKey + signature;
        }
        // Calculate new size
        const size = `00000000${(signedPayload.length / 2).toString(16)}`;
        const formatedSize = size.substr(size.length - 8, size.length);
        const littleEndianSize =
            formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);
        signedPayload = littleEndianSize + signedPayload.substr(8, signedPayload.length - 8);
        return new SignedTransaction(
            signedPayload,
            signedTransaction.hash,
            initiatorAccount.publicKey,
            transaction.type,
            transaction.networkType,
        );
    }
}
