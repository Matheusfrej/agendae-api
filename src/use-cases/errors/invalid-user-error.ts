export class InvalidUserError extends Error {
  constructor() {
    super("Email ou senha inválidos");
  }
}
