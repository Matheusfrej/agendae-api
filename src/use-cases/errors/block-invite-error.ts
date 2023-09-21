import { PreConditionalError } from "./pre-conditional-error";

export class BlockInviteError extends PreConditionalError {
  constructor() {
    super(409, "Você não pode convidar um usuário que bloqueou");
  }
}
