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
import { command, metadata } from 'clime';
import { ProfileCommand } from '../../interfaces/profile.command';
import { ProfileOptions } from '../../interfaces/profile.options';
import { FormatterService } from '../../services/formatter.service';

export class CommandOptions extends ProfileOptions {}

@command({
    description: 'Display the list of stored profiles',
})
export default class extends ProfileCommand {
    constructor() {
        super();
    }

    @metadata
    execute(options: CommandOptions) {
        let message = '';
        if (options.profile) {
            const profile = this.getProfile(options);
            console.log('\n' + profile.toString());
        } else {
            this.findAllProfiles().map((profile) => {
                message += '\n' + profile.toString();
            });
            console.log(message);
            try {
                const currentProfile = this.getDefaultProfile();
                console.log(FormatterService.title('Default profile:' + currentProfile.name));
            } catch {
                console.log(FormatterService.title('Default profile: None'));
            }
        }
    }
}
