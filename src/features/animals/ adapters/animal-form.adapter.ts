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
      motherId: animal?.motherId ? animal.motherId.toString() : "",
      fatherId: animal?.fatherId ? animal.fatherId.toString() : "",
      lotId: animal.lotId.toString(),
      breedId: animal.breedId ? animal.breedId.toString() : "",
      image: null,
    };
  }

  static mapFormDataToApi(formData: FormFieldsAnimal): FormData {
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (key === "image" && value instanceof File) {
          formDataToSend.append("image", value);
        } else if (value instanceof Date) {
          formDataToSend.append(key, value.toISOString());
        } else {
          formDataToSend.append(key, String(value));
        }
      }
    });

    return formDataToSend;
  }
}
