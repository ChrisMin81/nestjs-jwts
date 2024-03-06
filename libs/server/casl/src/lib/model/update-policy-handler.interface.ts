import { Action } from "@fst/shared/domain";
import { AppAbility, Subjects } from ".";
import { IPolicyHandler } from "./policy-handler.interface";

export class UpdatePolicyHandler<T extends Subjects> implements IPolicyHandler {
  constructor(private clazz: T ) { }
  handle(ability: AppAbility) {
    return ability.can(Action.Update, this.clazz);
  }
}