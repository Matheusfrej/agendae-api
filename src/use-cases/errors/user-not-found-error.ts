import { PreConditionalError } from "./pre-conditional-error";

export class UserNotFoundError extends PreConditionalError {
  constructor() {
    super(401, "Usuário não encontrado");
  }
}
