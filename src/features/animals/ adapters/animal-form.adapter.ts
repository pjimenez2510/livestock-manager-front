import { FormFieldsAnimal } from "../hooks/use-animal-form";
import {
  AnimalCreate,
  AnimalSex,
  Purpose,
  StatusAnimal,
} from "../interfaces/animal.interface";

export class AnimalFormAdapter {
  static mapAnimalToFormFields(animal?: AnimalCreate): FormFieldsAnimal {
    if (!animal) {
      return {
        name: "",
        number: "",
        description: "",
        dateOfBirth: undefined,
        dateOfPurchase: undefined,
        purpose: undefined as unknown as Purpose,
        status: StatusAnimal.ALIVE,
        sex: undefined as unknown as AnimalSex,
        motherId: "",
        fatherId: "",
        lotId: "",
        breedId: "",
      };
    }

    return {
      name: animal.name,
      number: animal.number,
      description: animal.description,
      dateOfBirth: animal.dateOfBirth
        ? new Date(animal.dateOfBirth)
        : undefined,
      dateOfPurchase: animal.dateOfPurchase
        ? new Date(animal.dateOfPurchase)
        : undefined,
      purpose: animal.purpose,
      status: animal.status,
      sex: animal.sex,
      motherId: animal.motherId?.toString() || "",
      fatherId: animal.fatherId?.toString() || "",
      lotId: animal.lotId.toString(),
      breedId: animal.breedId?.toString() || "",
    };
  }

  static mapFormDataToApi(formData: FormFieldsAnimal): AnimalCreate {
    return {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth : null,
      dateOfPurchase: formData.dateOfPurchase ? formData.dateOfPurchase : null,
      lotId: Number(formData.lotId),
      breedId: formData.breedId ? Number(formData.breedId) : null,
      motherId: formData.motherId ? Number(formData.motherId) : null,
      fatherId: formData.fatherId ? Number(formData.fatherId) : null,
    };
  }
}
