export class PreConditionalError extends Error {
  constructor(
    public httpCode: number,
    message: string,
  ) {
    super(message);
  }
}
