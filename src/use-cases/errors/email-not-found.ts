import { PreConditionalError } from "./pre-conditional-error";

export class EmailNotFoundError extends PreConditionalError {
  constructor() {
    super(404, "Não foi encontrada uma conta associada a esse email");
  }
}
