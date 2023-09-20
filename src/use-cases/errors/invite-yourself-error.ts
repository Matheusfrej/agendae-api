import { PreConditionalError } from "./pre-conditional-error";

export class InviteYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Não é possível convidar você mesmo para um rolê");
  }
}
