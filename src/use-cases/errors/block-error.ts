import { PreConditionalError } from "./pre-conditional-error";

export class BlockError extends PreConditionalError {
  constructor() {
    super(409, "Você é bloqueado ou bloqueou esse usuário");
  }
}
