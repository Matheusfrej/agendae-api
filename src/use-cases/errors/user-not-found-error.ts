import { PreConditionalError } from "./pre-conditional-error";

export class UserNotFoundError extends PreConditionalError {
  constructor() {
    super(404, "Usuário não encontrado");
  }
}
