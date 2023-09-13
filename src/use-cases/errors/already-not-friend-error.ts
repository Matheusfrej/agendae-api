export class AlreadyNotFriendError extends Error {
  constructor(name: string) {
    super(`Você já não é amigo de ${name}`);
  }
}
