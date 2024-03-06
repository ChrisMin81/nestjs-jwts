import { Action } from "@fst/shared/domain";
import { AppAbility, Subjects } from "../model";

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

// private newMethod(): PolicyHandler {
//   return (ability: AppAbility) => ability.can(Action.Create, PostDto);
// }
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export const applyPolicy = (action: Action, subject: Subjects): PolicyHandler => (ability: AppAbility) => ability.can(action, subject);