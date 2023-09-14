export class AlreadyBlockError extends Error {
  constructor() {
    super("Você já bloqueou esse usuário");
  }
}
