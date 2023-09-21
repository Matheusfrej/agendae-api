import { PreConditionalError } from "./pre-conditional-error";

export class UserNotInvitedError extends PreConditionalError {
  constructor() {
    super(418, "Você não foi convidado para esse rolê");
  }
}
