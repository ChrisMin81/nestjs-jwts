import { Action } from "@fst/shared/domain";
import { AppAbility, Subjects } from "../model";
import { IPolicyHandler } from "./policy-handler.interface";

export class ReadPolicyHandler<T extends Subjects> implements IPolicyHandler {
  constructor(private clazz: T ) { }
  handle(ability: AppAbility) {
    return ability.can(Action.Read, this.clazz);
  }
}