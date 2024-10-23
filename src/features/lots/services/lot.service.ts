import { BaseHttpService } from "@/core/services/base-http.service";
import { Lot, LotCreate, LotUpdate } from "../interfaces/lots.interface";
import { FilterLotsParams } from "../interfaces/filter-lot.interface";

export class LotService extends BaseHttpService<
  Lot,
  LotCreate,
  LotUpdate,
  FilterLotsParams
> {
  protected baseUrl: string = "/lots";
}
