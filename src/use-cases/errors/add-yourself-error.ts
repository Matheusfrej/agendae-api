export class AddYourselfError extends Error {
  constructor() {
    super("Não é possível adicionar você mesmo como amigo");
  }
}
