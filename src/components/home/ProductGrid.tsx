"use client";

import { useState } from "react";
import { Apple, Smartphone, Sparkles, LayoutGrid } from "lucide-react";
import { Produto } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductGridProps {
  produtos: Produto[];
}

type FiltroTab = "todos" | "apple" | "samsung" | "seminovos";

export function ProductGrid({ produtos }: ProductGridProps) {
  const [tabAtiva, setTabAtiva] = useState<FiltroTab>("todos");

  const produtosFiltrados = produtos.filter((p) => {
    if (tabAtiva === "apple") return p.marca === "apple";
    if (tabAtiva === "samsung") return p.marca === "samsung";
    if (tabAtiva === "seminovos") {
      return p.variacoes.some((v) => v.condicao === "seminovo");
    }
    return true;
  });

  return (
    <section id="catalogo" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Topo com Título e Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink-200 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 tracking-tight">
              Catálogo de Smartphones
            </h2>
            <p className="text-xs text-ink-500">
              Escolha seu modelo ideal com laudo de bateria e garantia comprovada.
            </p>
          </div>

          {/* Abas de Filtro */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setTabAtiva("todos")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                tabAtiva === "todos"
                  ? "bg-navy-950 text-white shadow-xs"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Todos ({produtos.length})</span>
            </button>

            <button
              onClick={() => setTabAtiva("apple")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                tabAtiva === "apple"
                  ? "bg-navy-950 text-white shadow-xs"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>Apple iPhone</span>
            </button>

            <button
              onClick={() => setTabAtiva("samsung")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                tabAtiva === "samsung"
                  ? "bg-navy-950 text-white shadow-xs"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Samsung Galaxy</span>
            </button>

            <button
              onClick={() => setTabAtiva("seminovos")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                tabAtiva === "seminovos"
                  ? "bg-gold-500 text-navy-950 shadow-xs font-bold"
                  : "bg-gold-50 text-gold-700 hover:bg-gold-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seminovos Selecionados</span>
            </button>
          </div>
        </div>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  );
}
