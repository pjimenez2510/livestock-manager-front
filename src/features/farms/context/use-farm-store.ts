import { create } from "zustand";
import { Farm } from "../interfaces/farm.interface";
import { FarmService } from "../services/farm.service";
interface SetFarmParams {
  farm?: Farm;
  idFarm?: number;
}
interface FarmStore {
  farm?: Farm;
  loading: boolean;
  setFarm: ({ farm, idFarm }: SetFarmParams) => void;
}

export const useFarmStore = create<FarmStore>((set) => ({
  farm: undefined,
  loading: true,
  error: null,
  setFarm: async ({ idFarm, farm }) => {
    if (farm) {
      set({
        farm,
        loading: false,
      });
      return;
    }
    set({
      farm: undefined,
      loading: true,
    });

    if (!idFarm) {
      set({
        farm: undefined,
        loading: false,
      });
      return;
    }

    await FarmService.getInstance()
      .getById(idFarm)
      .then((response) => {
        set({
          farm: response,
          loading: false,
        });
      })
      .catch((error) => {
        set({
          farm: undefined,
          loading: false,
        });
        console.error(error);
      });
  },
}));
