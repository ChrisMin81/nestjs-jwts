import { Action } from '@fst/shared/domain';
import { AppAbility, Subjects } from '../model';

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export const forActionOn = (action: Action, subject: Subjects): PolicyHandler => (ability: AppAbility) => ability.can(action, subject);
