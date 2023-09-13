export class RemoveFriendshipYourselfError extends Error {
  constructor() {
    super("Não é possível desfazer amizade com você mesmo");
  }
}
