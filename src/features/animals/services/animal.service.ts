import { BaseHttpService } from "@/core/services/base-http.service";

import {
  Animal,
  AnimalCreate,
  AnimalsUpdate,
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

  async createAnimal(data: FormData) {
    const response = await this.http.post<Animal>("/animals", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async updateAnimal(id: number, animalUpdateData: FormData) {
    const { data } = await this.http.patch<Animal>(
      `/animals/${id}`,
      animalUpdateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data.data;
  }

  async updateAnimals(animalUpdatePayload: AnimalsUpdate) {
    const { data } = await this.http.patch<number>(
      `/animals/bulk/update`,
      animalUpdatePayload
    );
    return data.data;
  }
}
