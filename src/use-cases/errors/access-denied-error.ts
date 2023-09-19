import { PreConditionalError } from "./pre-conditional-error";

export class AccessDeniedError extends PreConditionalError {
  constructor() {
    super(401, "Acesso negado");
  }
}
