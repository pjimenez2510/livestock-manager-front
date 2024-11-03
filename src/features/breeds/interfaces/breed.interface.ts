export interface BreedBase {
  name: string;
  description?: string;
}

export interface Breed extends BreedBase {
  id: number;
  createAt: string;
}

export type BreedCreate = BreedBase;

export type BreedUpdate = Partial<BreedBase>;
