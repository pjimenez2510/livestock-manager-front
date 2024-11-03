import { BaseHttpService } from "@/core/services/base-http.service";

import {
  Animal,
  AnimalCreate,
  AnimalUpdate,
} from "../interfaces/animal.interface";
import { FilterAnimalsParams } from "../interfaces/animal-filter.interface";

export class AnimalService extends BaseHttpService<
  Animal,
  AnimalCreate,
  AnimalUpdate,
  FilterAnimalsParams
> {
  protected baseUrl: string = "/animals";
}
