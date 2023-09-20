import { PreConditionalError } from "./pre-conditional-error";

export class UserAlreadyInSpinError extends PreConditionalError {
  constructor(name: string) {
    super(409, `${name} já está participando desse rolê`);
  }
}
