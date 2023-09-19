import { PreConditionalError } from "./pre-conditional-error";

export class AlreadyBlockError extends PreConditionalError {
  constructor() {
    super(409, "Você já bloqueou esse usuário");
  }
}
