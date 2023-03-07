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
import {
    RestrictionAccountAddressFlagValidator,
    RestrictionAccountTokenFlagValidator,
    RestrictionAccountOperationFlagValidator,
    RestrictionTokenTypeValidator,
} from '../../src/validators/restrictionType.validator';

describe('token restriction type validator', () => {
    it('valid token restriction type', () => {
        const restriction = 'EQ';
        expect(new RestrictionTokenTypeValidator().validate(restriction)).to.be.equal(true);
    });

    it('invalid token restriction type', () => {
        const restriction = '99';
        expect(typeof new RestrictionTokenTypeValidator().validate(restriction)).to.be.equal('string');
    });
});

describe('account restriction address flags validator', () => {
    it('valid account restriction address flag', () => {
        const restriction = 'AllowIncomingAddress';
        expect(new RestrictionAccountAddressFlagValidator().validate(restriction)).to.be.equal(true);
    });

    it('invalid account restriction address flag', () => {
        const restriction = '99';
        expect(typeof new RestrictionAccountAddressFlagValidator().validate(restriction)).to.be.equal('string');
    });
});

describe('account restriction token flags validator', () => {
    it('valid account restriction token flag', () => {
        const restriction = 'AllowToken';
        expect(new RestrictionAccountTokenFlagValidator().validate(restriction)).to.be.equal(true);
    });

    it('invalid account restriction token flag', () => {
        const restriction = '99';
        expect(typeof new RestrictionAccountTokenFlagValidator().validate(restriction)).to.be.equal('string');
    });
});

describe('account restriction operation flags validator', () => {
    it('valid account restriction operation flag', () => {
        const restriction = 'BlockOutgoingTransactionType';
        expect(new RestrictionAccountOperationFlagValidator().validate(restriction)).to.be.equal(true);
    });

    it('invalid account restriction operation flag', () => {
        const restriction = '99';
        expect(typeof new RestrictionAccountOperationFlagValidator().validate(restriction)).to.be.equal('string');
    });
});
