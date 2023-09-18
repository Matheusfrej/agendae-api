import { Spin } from "@prisma/client";

export interface CreateSpinRepositoryInterface {
  title: string;
  organizer_id: string;
  theme_color: string;
  description?: string;
  place?: string;
  start_date?: Date;
  end_date?: Date;
}

export interface SpinRepositoryInterface {
  getTotalSpinsNumber(organizer_id: string): Promise<number | null>;
  getPastSpinsNumber(organizer_id: string): Promise<number | null>;
  createSpin(data: CreateSpinRepositoryInterface): Promise<Spin | null>;
}
