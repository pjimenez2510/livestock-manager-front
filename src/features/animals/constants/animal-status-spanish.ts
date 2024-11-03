import { StatusAnimal } from "../interfaces/animal.interface";

interface Status {
  label: string;
  class: string;
  description?: string;
}

export const animalStatusSpanish: Record<StatusAnimal, Status> = {
  ALIVE: {
    label: "Vivo",
    class: "bg-green-400 hover:bg-green-500",
    description: "El animal está vivo",
  },
  SOLD: {
    label: "Vendido",
    class: "bg-gray-400 hover:bg-gray-500",
    description: "El animal está vendido",
  },
  DECEASED: {
    label: "Muerto",
    class: "bg-red-600 hover:bg-red-700",
    description: "El animal está muerto",
  },
  LOST: {
    label: "Perdido",
    class: "bg-yellow-500 hover:bg-yellow-600",
    description: "El animal ha sido perdido",
  },
};
