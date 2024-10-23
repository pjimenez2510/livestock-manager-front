import { create } from "zustand";
import { Farm } from "../interfaces/farm.interface";
import { FarmService } from "../services/farm.service";
interface SetFarmParams {
  farm?: Farm;
  idFarm?: number;
}
interface FarmStore {
  farm: Farm | null;
  loading: boolean;
  setFarm: ({ farm, idFarm }: SetFarmParams) => void;
}

export const useFarmStore = create<FarmStore>((set) => ({
  farm: null,
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
      farm: null,
      loading: true,
    });

    if (!idFarm) {
      set({
        farm: null,
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
          farm: null,
          loading: false,
        });
        console.error(error);
      });
  },
}));
