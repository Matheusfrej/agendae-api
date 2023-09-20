import { PreConditionalError } from "./pre-conditional-error";

export class UserAlreadyInvitedError extends PreConditionalError {
  constructor(name: string) {
    super(409, `${name} já está convidado(a) para esse rolê`);
  }
}
