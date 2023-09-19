import { PreConditionalError } from "./pre-conditional-error";

export class InvalidUserError extends PreConditionalError {
  constructor() {
    super(401, "Email ou senha inválidos");
  }
}
