import { PreConditionalError } from "./pre-conditional-error";

export class AddFriendBlockError extends PreConditionalError {
  constructor() {
    super(409, "Você não pode adicionar um amigo que você bloqueou");
  }
}
