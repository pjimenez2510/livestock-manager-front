import { z } from "zod";
import {
  AnimalSex,
  Purpose,
  StatusAnimal,
} from "../interfaces/animal.interface";
import { schemaLotFilter } from "@/features/lots/hooks/use-lot-filter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterAnimalsParams } from "../interfaces/animal-filter.interface";
import { AnimalFormFilterAdapter } from "../ adapters/animal-form-filter.adapter";

const schemaAnimalFilter = z.object({
  filter: z.string().optional(),
  name: z.string().optional(),
  number: z.string().optional(),
  description: z.string().optional(),
  dateOfBirth: z.date().optional(),
  dateOfPurchase: z.date().optional(),
  purpose: z.nativeEnum(Purpose).optional(),
  status: z.nativeEnum(StatusAnimal).optional(),
  sex: z.nativeEnum(AnimalSex).optional(),
  breedId: z.number().optional(),
  motherId: z.number().optional(),
  fatherId: z.number().optional(),
  lotId: z.number().optional(),
  lot: schemaLotFilter.optional(),
});

export type FormFieldsAnimalFilter = z.infer<typeof schemaAnimalFilter>;

interface FormProps {
  filterOptions?: FilterAnimalsParams;
}

const useAnimalFilter = ({ filterOptions }: FormProps) => {
  const methods = useForm<FormFieldsAnimalFilter>({
    resolver: zodResolver(schemaAnimalFilter),
    defaultValues: AnimalFormFilterAdapter.mapAnimalToFormFields(filterOptions),
  });

  const values = AnimalFormFilterAdapter.mapFormDataToApi(methods.watch());

  return { methods, values };
};

export default useAnimalFilter;
