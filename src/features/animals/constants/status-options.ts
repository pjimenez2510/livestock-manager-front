import { StatusAnimal } from "../interfaces/animal.interface";

export const statusOptions = [
  { value: StatusAnimal.ALIVE, label: "Vivo" },
  { value: StatusAnimal.SOLD, label: "Vendido" },
  { value: StatusAnimal.LOST, label: "Perdido" },
  { value: StatusAnimal.DECEASED, label: "Muerto" },
];
