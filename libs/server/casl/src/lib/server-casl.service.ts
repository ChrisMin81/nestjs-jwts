import { AbilityBuilder, AbilityClass, ExtractSubjectType, PureAbility } from '@casl/ability';
import { PostDto } from '@fst/server/feature-post';
import { UserDto } from '@fst/server/users';
import { Action } from '@fst/shared/domain';
import { Injectable } from '@nestjs/common';
import { AppAbility, Subjects } from './model/subjects';

@Injectable()
export class ServerCaslAbilityFactory {
    createForUser(user: UserDto) {
        const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<AppAbility>);

        can(Action.Read, 'all'); // read-only access to everything
        if (!!user) {
            
            if (user.isAdmin) {
                can(Action.Manage, 'all'); // read-write access to everything
            } else {                
                can(Action.Create, PostDto, true);
                can(Action.Update, PostDto, { authorId: user.userId });
                can(Action.Delete, PostDto, { isPublished: false, authorId: user.userId });
            }
        } else {
            cannot(Action.Create, PostDto, false);
            cannot(Action.Update, PostDto);
            cannot(Action.Delete, PostDto);
        }

        return build({
            // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
