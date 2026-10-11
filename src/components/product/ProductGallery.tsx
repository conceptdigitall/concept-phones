"use client";

import Image from "next/image";
import { ShieldCheck, BatteryCharging } from "lucide-react";
import { Variacao } from "@/lib/types";

interface ProductGalleryProps {
  variacaoSelecionada: Variacao;
  nomeProduto: string;
}

export function ProductGallery({
  variacaoSelecionada,
  nomeProduto,
}: ProductGalleryProps) {
  const isNovo = variacaoSelecionada.condicao === "novo";

  return (
    <div className="space-y-4">
      {/* Imagem Principal em Destaque */}
      <div className="relative w-full aspect-square bg-white rounded-3xl border border-ink-200 p-8 flex items-center justify-center overflow-hidden shadow-xs">
        {/* Badges Flutuantes */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs ${
              isNovo
                ? "bg-navy-950 text-gold-400"
                : "bg-gold-500 text-navy-950"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {isNovo ? "Novo Lacrado de Fábrica" : "Seminovo Premium A+"}
          </span>

          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center gap-1.5">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
            {variacaoSelecionada.saudeBateria}
          </span>
        </div>

        {/* Imagem do Aparelho */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={variacaoSelecionada.imagem}
            alt={`${nomeProduto} ${variacaoSelecionada.cor.nome}`}
            fill
            priority
            className="object-contain p-2 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Indicador de Cor Selecionada */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-ink-200 text-xs font-semibold text-ink-700">
          Cor: {variacaoSelecionada.cor.nome}
        </div>
      </div>
    </div>
  );
}
