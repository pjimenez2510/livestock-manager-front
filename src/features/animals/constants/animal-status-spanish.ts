import { StatusAnimal } from "../interfaces/animal.interface";

interface Status {
  label: string;
  class: string;
  description?: string;
}

export const animalStatusSpanish: Record<StatusAnimal, Status> = {
  ALIVE: {
    label: "Vivo",
    class: "bg-green-200 hover:bg-green-300 text-green-900",
    description: "El animal está vivo",
  },
  SOLD: {
    label: "Vendido",
    class: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    description: "El animal está vendido",
  },
  DECEASED: {
    label: "Muerto",
    class: "bg-red-200 hover:bg-red-300 text-red-900",
    description: "El animal está muerto",
  },
  LOST: {
    label: "Perdido",
    class: "bg-yellow-200 hover:bg-yellow-300 text-yellow-900",
    description: "El animal ha sido perdido",
  },
};
