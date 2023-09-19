import { PreConditionalError } from "./pre-conditional-error";

export class AlreadyFriendError extends PreConditionalError {
  constructor() {
    super(409, "Você já tem esse usuário adicionado");
  }
}
