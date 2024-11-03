export enum Purpose {
  Milk = "MILK",
  Meat = "MEAT",
  DualPurpose = "DUAL_PURPOSE",
}

export enum StatusAnimal {
  ALIVE = "ALIVE",
  SOLD = "SOLD",
  DECEASED = "DECEASED",
  LOST = "LOST",
}

export enum AnimalSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface AnimalBase {
  name: string;
  number: string;
  urlImage?: string;
  description?: string;
  dateOfBirth?: Date | null;
  dateOfPurchase?: Date | null;
  purpose: Purpose;
  status: StatusAnimal;
  sex: AnimalSex;
  motherId?: number;
  fatherId?: number;
  lotId: number;
  breedId?: number;
}

export interface Animal extends AnimalBase {
  id: number;
  createAt: string;
}

export type AnimalCreate = AnimalBase;

export type AnimalUpdate = Partial<AnimalBase>;
