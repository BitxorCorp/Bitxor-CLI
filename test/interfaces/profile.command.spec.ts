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
import * as fs from 'fs';
import { ProfileCommand } from '../../src/interfaces/profile.command';
import { ProfileRepository } from '../../src/respositories/profile.repository';
import { mockPrivateKeyProfile1 } from '../mocks/profiles/profile.mock';

describe('Profile Command', () => {
    let repositoryFileUrl: string;
    let command: ProfileCommand;

    class StubCommand extends ProfileCommand {
        constructor() {
            super(repositoryFileUrl);
        }

        execute() {
            throw new Error('Method not implemented');
        }
    }

    const removeAccountsFile = () => {
        const file = (process.env.HOME || process.env.USERPROFILE) + '/' + repositoryFileUrl;
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    };

    before(() => {
        removeAccountsFile();
        repositoryFileUrl = '.bitxorrctest.json';
        command = new StubCommand();
    });

    beforeEach(() => {
        removeAccountsFile();
    });

    after(() => {
        removeAccountsFile();
    });

    it('repository url should be overwritten', () => {
        expect(command['profileService']['profileRepository']['fileUrl']).to.equal(repositoryFileUrl);
    });

    it('should get a new profile', () => {
        new ProfileRepository(repositoryFileUrl).save(mockPrivateKeyProfile1);
        const options = { profile: mockPrivateKeyProfile1.name };
        const profile = command['getProfile'](options);
        expect(profile.name).to.equal(mockPrivateKeyProfile1.name);
    });

    it('should not get a profile that does not exist', () => {
        const options = { profile: 'random' };
        expect(() => command['getProfile'](options)).to.throws(Error);
    });

    it('should get a profile saved as default', () => {
        const profileRepository = new ProfileRepository(repositoryFileUrl);
        profileRepository.save(mockPrivateKeyProfile1);
        profileRepository.setDefault(mockPrivateKeyProfile1.name);
        const profile = command['getDefaultProfile']();
        expect(profile.name).to.be.equal(mockPrivateKeyProfile1.name);
    });

    it('should throw error if trying to retrieve a default profile that does not exist', () => {
        const profileRepository = new ProfileRepository(repositoryFileUrl);
        profileRepository.save(mockPrivateKeyProfile1);
        expect(() => command['getDefaultProfile']()).to.throws(Error);
    });

    it('should get all  saved profiles', () => {
        const profileRepository = new ProfileRepository(repositoryFileUrl);
        profileRepository.save(mockPrivateKeyProfile1);
        const profile = command['findAllProfiles']()[0];
        expect(profile.name).to.be.equal(mockPrivateKeyProfile1.name);
    });
});
