export enum Purpose {
  Milk = "MILK",
  Meat = "MEAT",
  DualPurpose = "DUAL_PURPOSE",
}

export interface LotBase {
  name: string;
  address: string;
  purpose: Purpose;
  dimension: number;
}

export interface Lot extends LotBase {
  id: number;
  createAt: string;
}

export type LotCreate = LotBase;

export type LotUpdate = Partial<LotBase>;
