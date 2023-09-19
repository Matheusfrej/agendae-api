import { PreConditionalError } from "./pre-conditional-error";

export class BlockedError extends PreConditionalError {
  constructor() {
    super(409, "Você é bloqueado por esse usuário");
  }
}
