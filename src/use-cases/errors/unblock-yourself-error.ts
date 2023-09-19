import { PreConditionalError } from "./pre-conditional-error";

export class UnblockYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Você não pode desbloquear você mesmo");
  }
}
