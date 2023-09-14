export class BlockYourselfError extends Error {
  constructor() {
    super("Você não pode bloquear a si mesmo");
  }
}
