import { Spin } from "@prisma/client";

export interface CreateSpinRepositoryInterface {
  title: string;
  organizer_id: string;
  theme_color: string;
  description?: string;
  place?: string;
  start_date?: Date;
  has_start_time: boolean;
  end_date?: Date;
  has_end_time: boolean;
}

export interface UpdateSpinRepositoryInterface {
  title?: string;
  theme_color?: string;
  description?: string;
  place?: string;
  start_date?: Date;
  has_start_time?: boolean;
  end_date?: Date;
  has_end_time?: boolean;
}

export interface SpinRepositoryInterface {
  getTotalSpinsNumber(organizer_id: string): Promise<number | null>;
  getPastSpinsNumber(organizer_id: string): Promise<number | null>;
  createSpin(
    data: CreateSpinRepositoryInterface,
    participants: string[],
  ): Promise<Spin | null>;
  findById(spin_id: string): Promise<Spin | null>;
  findByIdAndUpdate(
    spin_id: string,
    data: UpdateSpinRepositoryInterface,
    participants: string[],
  ): Promise<Spin | null>;
  findByIdAndDelete(spin_id: string): Promise<Spin | null>;
}
