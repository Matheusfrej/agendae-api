import { PreConditionalError } from "./pre-conditional-error";

export class UserNotInSpinError extends PreConditionalError {
  constructor() {
    super(401, "Usuário não está no rolê");
  }
}
