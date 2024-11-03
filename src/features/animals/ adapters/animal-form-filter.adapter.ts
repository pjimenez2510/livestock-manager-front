import { FormFieldsAnimalFilter } from "../hooks/use-animal-filter";
import { FilterAnimalsParams } from "../interfaces/animal-filter.interface";

export class AnimalFormFilterAdapter {
  static mapAnimalToFormFields(
    filterParams?: FilterAnimalsParams
  ): FormFieldsAnimalFilter {
    return {
      ...filterParams,
    };
  }

  static mapFormDataToApi(
    formData: FormFieldsAnimalFilter
  ): FilterAnimalsParams {
    return {
      filter: formData.filter || undefined,
      name: formData.name || undefined,
      number: formData.number || undefined,
      description: formData.description || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      dateOfPurchase: formData.dateOfPurchase || undefined,
      purpose: formData.purpose || undefined,
      status: formData.status || undefined,
      breedId: formData.breedId || undefined,
      motherId: formData.motherId || undefined,
      fatherId: formData.fatherId || undefined,
      lotId: formData.lotId || undefined,
      lot: {
        dimension: formData.lot?.dimension || undefined,
        name: formData.lot?.name || undefined,
        farmId: formData.lot?.farmId || undefined,
        purpose: formData.lot?.purpose || undefined,
      },
      sex: formData.sex || undefined,
    };
  }
}
