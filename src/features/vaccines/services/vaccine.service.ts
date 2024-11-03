import { BaseHttpService } from "@/core/services/base-http.service";

import {
  Vaccine,
  VaccineCreate,
  VaccineUpdate,
} from "../interfaces/vaccine.interface";

export class VaccineService extends BaseHttpService<
  Vaccine,
  VaccineCreate,
  VaccineUpdate,
  undefined
> {
  protected baseUrl: string = "/vaccines";
}
