import { AnimalSex } from "../interfaces/animal.interface";

interface Sex {
  label: string;
  class: string;
  description?: string;
}

export const animalSexSpanish: Record<AnimalSex, Sex> = {
  MALE: {
    label: "Macho",
    class: "bg-blue-200 hover:bg-blue-300 text-blue-900",
    description: "El animal es un macho",
  },
  FEMALE: {
    label: "Hembra",
    class: "bg-pink-200 hover:bg-pink-300 text-pink-900",
    description: "El animal es una hembra",
  },
};
