import { InferSubjects, PureAbility } from '@casl/ability';
import { UserDto } from '@fst/server/users';
import { Action } from '@fst/shared/domain';
import { PostDto } from '@fst/server/shared';

export type Subjects = InferSubjects<typeof PostDto | typeof UserDto> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;
