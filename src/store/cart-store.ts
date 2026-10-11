import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ItemCarrinho } from "@/lib/types";

interface CarrinhoState {
  itens: ItemCarrinho[];
  gavetaAberta: boolean;
  adicionarItem: (item: ItemCarrinho) => void;
  removerItem: (variacaoId: string) => void;
  atualizarQuantidade: (variacaoId: string, quantidade: number) => void;
  limparCarrinho: () => void;
  abrirGaveta: () => void;
  fecharGaveta: () => void;
  totalItens: () => number;
  subtotal: () => number;
  subtotalPix: () => number;
}

export const useCarrinho = create<CarrinhoState>()(
  persist(
    (set, get) => ({
      itens: [],
      gavetaAberta: false,

      adicionarItem: (novoItem) => {
        set((state) => {
          const indexExistente = state.itens.findIndex(
            (i) => i.variacaoId === novoItem.variacaoId
          );

          if (indexExistente >= 0) {
            const novosItens = [...state.itens];
            novosItens[indexExistente] = {
              ...novosItens[indexExistente],
              quantidade:
                novosItens[indexExistente].quantidade + novoItem.quantidade,
            };
            return { itens: novosItens, gavetaAberta: true };
          }

          return { itens: [...state.itens, novoItem], gavetaAberta: true };
        });
      },

      removerItem: (variacaoId) => {
        set((state) => ({
          itens: state.itens.filter((i) => i.variacaoId !== variacaoId),
        }));
      },

      atualizarQuantidade: (variacaoId, quantidade) => {
        if (quantidade <= 0) {
          get().removerItem(variacaoId);
          return;
        }

        set((state) => ({
          itens: state.itens.map((i) =>
            i.variacaoId === variacaoId ? { ...i, quantidade } : i
          ),
        }));
      },

      limparCarrinho: () => set({ itens: [] }),

      abrirGaveta: () => set({ gavetaAberta: true }),
      fecharGaveta: () => set({ gavetaAberta: false }),

      totalItens: () =>
        get().itens.reduce((acc, item) => acc + item.quantidade, 0),

      subtotal: () =>
        get().itens.reduce(
          (acc, item) => acc + item.precoUnitario * item.quantidade,
          0
        ),

      subtotalPix: () =>
        get().itens.reduce(
          (acc, item) => acc + item.precoPixUnitario * item.quantidade,
          0
        ),
    }),
    {
      name: "concept-phones-carrinho",
      partialize: (state) => ({ itens: state.itens }),
    }
  )
);
