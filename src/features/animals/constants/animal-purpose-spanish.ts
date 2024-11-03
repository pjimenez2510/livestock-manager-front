import { Purpose } from "../interfaces/animal.interface";

interface Option {
  label: string;
  class: string;
  description?: string;
}

export const animalPurposeSpanish: Record<Purpose, Option> = {
  MILK: {
    label: "Leche",
    class: "bg-indigo-200 hover:bg-indigo-300 text-indigo-900",
    description: "El animal es para producción de leche",
  },
  MEAT: {
    label: "Carne",
    class: "bg-orange-200 hover:bg-orange-300 text-orange-900",
    description: "El animal es para producción de carne",
  },
  DUAL_PURPOSE: {
    label: "Doble Propósito",
    class: "bg-teal-200 hover:bg-teal-300 text-teal-900",
    description: "El animal es para doble propósito",
  },
};
