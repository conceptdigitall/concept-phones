import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritosState {
  produtoIds: string[];
  alternarFavorito: (produtoId: string) => void;
  isFavorito: (produtoId: string) => boolean;
}

export const useFavoritos = create<FavoritosState>()(
  persist(
    (set, get) => ({
      produtoIds: [],

      alternarFavorito: (produtoId) => {
        const { produtoIds } = get();
        if (produtoIds.includes(produtoId)) {
          set({ produtoIds: produtoIds.filter((id) => id !== produtoId) });
        } else {
          set({ produtoIds: [...produtoIds, produtoId] });
        }
      },

      isFavorito: (produtoId) => get().produtoIds.includes(produtoId),
    }),
    {
      name: "concept-phones-favoritos",
    }
  )
);
