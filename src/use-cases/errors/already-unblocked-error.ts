import { PreConditionalError } from "./pre-conditional-error";

export class AlreadyUnblockedError extends PreConditionalError {
  constructor() {
    super(409, "Você não tem esse usuário bloqueado");
  }
}
