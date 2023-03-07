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
import { NetworkType } from 'bitxor-sdk';
import { DerivationService } from '../../src/services/derivation.service';

const paths = [
    "m/44'/4343'/0'/0'/0'",
    "m/44'/4343'/1'/0'/0'",
    "m/44'/4343'/2'/0'/0'",
    "m/44'/4343'/3'/0'/0'",
    "m/44'/4343'/4'/0'/0'",
    "m/44'/4343'/5'/0'/0'",
    "m/44'/4343'/6'/0'/0'",
    "m/44'/4343'/7'/0'/0'",
    "m/44'/4343'/8'/0'/0'",
    "m/44'/4343'/9'/0'/0'",
];

const paths_test = [
    "m/44'/1'/0'/0'/0'",
    "m/44'/1'/1'/0'/0'",
    "m/44'/1'/2'/0'/0'",
    "m/44'/1'/3'/0'/0'",
    "m/44'/1'/4'/0'/0'",
    "m/44'/1'/5'/0'/0'",
    "m/44'/1'/6'/0'/0'",
    "m/44'/1'/7'/0'/0'",
    "m/44'/1'/8'/0'/0'",
    "m/44'/1'/9'/0'/0'",
];

describe('DerivationService_main', () => {
    it('getPathFromPathNumber should return the proper paths', () => {
        for (let i = 0; i < 10; i++) {
            expect(DerivationService.getPathFromPathNumber(i, NetworkType.MAIN_NET)).to.equal(paths[i]);
        }
    });

    it('getPathFromPathNumber should throw if an invalid argument is provided', () => {
        expect(() => DerivationService.getPathFromPathNumber(-1, NetworkType.MAIN_NET)).to.throw();
        expect(() => DerivationService.getPathFromPathNumber(11, NetworkType.MAIN_NET)).to.throw();
    });

    it('getPathIndexFromPath should retun the right path indexes', () => {
        for (let i = 0; i < 10; i++) {
            expect(DerivationService.getPathIndexFromPath(paths[i])).to.equal(i);
        }
    });

    it('getPrivateKeyFromMnemonic should return the right private keys', () => {
        // eslint-disable-next-line max-len
        const mnemonic =
            'uniform promote eyebrow frequent mother order evolve spell elite lady clarify accuse annual tenant rotate walnut wisdom render before million scrub scan crush sense';

        expect(DerivationService.getPrivateKeyFromMnemonic(mnemonic,  NetworkType.MAIN_NET).toUpperCase()).to.equal(
            'F3C1B6EF898665942808EDBE23302377E508AE32F61F6F76BE691BE07B58823E',
        );

        expect(DerivationService.getPrivateKeyFromMnemonic(mnemonic,  NetworkType.MAIN_NET).toUpperCase()).to.equal(
            '5F3E543556B91B24441B29BDF05707AE2E70D9F5CC4C7F77362D22CD6359A8CD',
        );

        expect(DerivationService.getPrivateKeyFromMnemonic(mnemonic, NetworkType.MAIN_NET).toUpperCase()).to.equal(
            '2DAD7D36B751708DDE3D65AB7FE07D6FD9925662A540851C7258842E52D4EDD5',
        );
    });

    
});

describe('DerivationService_test', () => {
    

    

    

    it('getPrivateKeyFromMnemonic should return the right private keys', () => {
        // eslint-disable-next-line max-len
        const mnemonic =
            'uniform promote eyebrow frequent mother order evolve spell elite lady clarify accuse annual tenant rotate walnut wisdom render before million scrub scan crush sense';

        expect(DerivationService.getPrivateKeyFromMnemonic(mnemonic, NetworkType.TEST_NET).toUpperCase()).to.equal(
            '44D827AB26A1BFEFB3491F6C37FB70258210F43947C4E9A52CAA7A1B27563E6B',
        );

        expect(DerivationService.getPrivateKeyFromMnemonic(mnemonic, NetworkType.TEST_NET).toUpperCase()).to.equal(
            '190BCA6AC77B40AFCCDCDC83AC3639B753774C27FCA8FADD23F853D9F80EBD48',
        );

        expect(DerivationService.getPrivateKeyFromMnemonic(mnemonic, NetworkType.TEST_NET).toUpperCase()).to.equal(
            '0B099FF928D0DFCCDC9F7845A8BF4ED49155E95F0DF1FB2912F7929FE06ADEAF',
        );
    });

    });
