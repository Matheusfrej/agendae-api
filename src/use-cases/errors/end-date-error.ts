import { PreConditionalError } from "./pre-conditional-error";

export class EndDateError extends PreConditionalError {
  constructor() {
    super(400, "A data de fim não pode ser antes da data de início");
  }
}
