export class DenyYourselfError extends Error {
  constructor() {
    super("Não é possível recusar um pedido de amizade de você mesmo");
  }
}
