import { InferSubjects, PureAbility } from "@casl/ability";
import { PostDto } from "@fst/server/feature-post";
import { UserDto } from "@fst/server/users";
import { Action } from "@fst/shared/domain";

export type Subjects = InferSubjects<typeof PostDto | typeof UserDto> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;