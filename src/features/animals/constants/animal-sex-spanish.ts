import { AnimalSex } from "../interfaces/animal.interface";

interface Sex {
  label: string;
  class: string;
  description?: string;
}

export const animalSexSpanish: Record<AnimalSex, Sex> = {
  MALE: {
    label: "Macho",
    class: "bg-blue-500 hover:bg-blue-600",
    description: "El animal es un macho",
  },
  FEMALE: {
    label: "Hembra",
    class: "bg-pink-500 hover:bg-pink-600",
    description: "El animal es una hembra",
  },
};
