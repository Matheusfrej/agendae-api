export class AddFriendBlockedError extends Error {
  constructor() {
    super("Você não pode adicionar um amigo que te bloqueou");
  }
}
