import { PreConditionalError } from "./pre-conditional-error";

export class AlreadyBlockedError extends PreConditionalError {
  constructor() {
    super(409, "Você já é bloqueado por esse usuário");
  }
}
