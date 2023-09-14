export interface SpinRepositoryInterface {
  getTotalSpinsNumber(organizer_id: string): Promise<number | null>;
  getPastSpinsNumber(organizer_id: string): Promise<number | null>;
}
