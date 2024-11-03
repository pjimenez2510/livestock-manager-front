export enum IntervalType {
  Day = "DAY",
  Month = "MONTH",
  Year = "YEAR",
}

export interface VaccineBase {
  name: string;
  description?: string;
  intervalDays?: number;
  intervalType?: IntervalType;
}

export interface Vaccine extends VaccineBase {
  id: number;
  createAt: string;
}

export type VaccineCreate = VaccineBase;

export type VaccineUpdate = Partial<VaccineBase>;
