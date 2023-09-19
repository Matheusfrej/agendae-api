import { PreConditionalError } from "./pre-conditional-error";

export class DenyYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Não é possível recusar um pedido de amizade de você mesmo");
  }
}
