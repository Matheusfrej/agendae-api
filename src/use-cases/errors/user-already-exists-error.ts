import { PreConditionalError } from "./pre-conditional-error";

export class UserAlreadyExistsError extends PreConditionalError {
  constructor() {
    super(409, "E-mail já possui uma conta.");
  }
}
