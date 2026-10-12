"use client";

import Link from "next/link";
import { ArrowRight, Headphones, Shield, Zap, Sparkles } from "lucide-react";

const ACESSORIOS = [
  {
    id: "earbuds",
    nome: "Fones Sem Fio Pro",
    tipo: "Áudio Espacial",
    preco: 699,
    icone: Headphones,
  },
  {
    id: "case",
    nome: "Case Magnética Slim",
    tipo: "Proteção & Couro",
    preco: 149,
    icone: Shield,
  },
  {
    id: "charger",
    nome: "Carregador GaN 65W",
    tipo: "Carga Ultra-Rápida",
    preco: 199,
    icone: Zap,
  },
  {
    id: "protector",
    nome: "Película Cerâmica 9H",
    tipo: "Anti-Risco & Queda",
    preco: 79,
    icone: Sparkles,
  },
];

export function AccessoriesSection() {
  return (
    <div id="acessorios" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#787366] uppercase block">
            Acessórios
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0f1115]">
            Complete Sua Experiência
          </h3>
          <p className="text-xs text-[#686f7c] mt-0.5">
            Acessórios premium projetados para proteger e potencializar seu aparelho.
          </p>
        </div>
        <Link
          href="/#catalogo"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1f2229] hover:text-black transition"
        >
          <span>Ver Todos</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Grid de Cards de Acessórios */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACESSORIOS.map((item) => {
          const Icone = item.icone;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-[#e4e0d4] hover:border-[#b8b3a5] hover:shadow-sm transition flex flex-col justify-between group"
            >
              {/* Ícone de Destaque */}
              <div className="w-10 h-10 rounded-xl bg-[#faf9f5] group-hover:bg-[#0f1115] text-[#22252a] group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <Icone className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#0f1115] group-hover:text-black transition">
                  {item.nome}
                </h4>
                <span className="text-[10px] text-[#7b818f] block">
                  {item.tipo}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-[#f2efe6] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0f1115]">
                  R$ {item.preco}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Em estoque
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
