import { PreConditionalError } from "./pre-conditional-error";

export class UserNotInSpinError extends PreConditionalError {
  constructor(name = "Usuário") {
    super(401, `${name} não está no rolê`);
  }
}
