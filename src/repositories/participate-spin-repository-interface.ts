export interface ParticipateSpinRepositoryInterface {
  getParticipateSpinNumber(user_id: string): Promise<number | null>;
  getPastParticipateSpinNumber(user_id: string): Promise<number | null>;
}
