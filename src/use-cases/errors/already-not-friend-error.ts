import { PreConditionalError } from "./pre-conditional-error";

export class AlreadyNotFriendError extends PreConditionalError {
  constructor(name: string) {
    super(409, `Você já não é amigo de ${name}`);
  }
}
