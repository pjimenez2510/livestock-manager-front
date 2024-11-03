import { BaseHttpService } from "@/core/services/base-http.service";

import { Breed, BreedCreate, BreedUpdate } from "../interfaces/breed.interface";

export class BreedService extends BaseHttpService<
  Breed,
  BreedCreate,
  BreedUpdate,
  undefined
> {
  protected baseUrl: string = "/breeds";
}
