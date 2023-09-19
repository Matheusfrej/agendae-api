import { PreConditionalError } from "./pre-conditional-error";

export class AddFriendBlockedError extends PreConditionalError {
  constructor() {
    super(409, "Você não pode adicionar um amigo que te bloqueou");
  }
}
