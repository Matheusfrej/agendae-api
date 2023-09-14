export class AddFriendBlockError extends Error {
  constructor() {
    super("Você não pode adicionar um amigo que você bloqueou");
  }
}
