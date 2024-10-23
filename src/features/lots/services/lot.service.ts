import { BaseHttpService } from "@/core/services/base-http.service";
import { Lot, LotCreate, LotUpdate } from "../interfaces/lots.interface";

export class LotService extends BaseHttpService<Lot, LotCreate, LotUpdate> {
  protected baseUrl: string = "/lots";
}
