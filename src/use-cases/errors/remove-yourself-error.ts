import { PreConditionalError } from "./pre-conditional-error";

export class RemoveYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Não é possível remover você mesmo do seu rolê");
  }
}
