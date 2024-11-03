import { FilterLotsParams } from "@/features/lots/interfaces/filter-lot.interface";
import { AnimalSex, Purpose, StatusAnimal } from "./animal.interface";

export interface FilterAnimalsParams {
  filter?: string;
  name?: string;
  number?: string;
  urlImg?: string;
  description?: string;
  dateOfBirth?: Date;
  dateOfPurchase?: Date;
  purpose?: Purpose;
  status?: StatusAnimal;
  sex?: AnimalSex;
  breedId?: number;
  motherId?: number;
  fatherId?: number;
  lotId?: number;
  lot?: FilterLotsParams;
}
