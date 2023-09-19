import { PreConditionalError } from "./pre-conditional-error";

export class RemoveFriendshipYourselfError extends PreConditionalError {
  constructor() {
    super(409, "Não é possível desfazer amizade com você mesmo");
  }
}
