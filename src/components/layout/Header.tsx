"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, ChevronDown, User, Sparkles } from "lucide-react";
import { useCarrinho } from "@/store/cart-store";

export function Header() {
  const [termoBusca, setTermoBusca] = useState("");
  const { totalItens, abrirGaveta } = useCarrinho();
  const quantidadeItens = totalItens();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f6f5f0]/90 backdrop-blur-md border-b border-[#e5e2d6] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo Estilo Minimalista / Nexora */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0f1115] transition group-hover:opacity-80">
              Nexora<span className="text-[#8e8a7d] font-normal text-xs ml-1 tracking-widest uppercase">Phones</span>
            </span>
          </Link>

          {/* Links de Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#4a4f59]">
            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#0f1115] transition py-2">
              <Link href="/#lineup">Modelos</Link>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
            </div>
            <Link href="/#comparador" className="hover:text-[#0f1115] transition">
              Comparador
            </Link>
            <Link href="/#acessorios" className="hover:text-[#0f1115] transition">
              Acessórios
            </Link>
            <Link href="/#showcase" className="hover:text-[#0f1115] transition">
              Showcase
            </Link>
            <Link href="/#avaliacoes" className="hover:text-[#0f1115] transition">
              Avaliações
            </Link>
          </nav>
        </div>

        {/* Lado Direito: Busca, Usuário & Botão Shop Now / Carrinho */}
        <div className="flex items-center gap-3">
          {/* Busca estilo Pill */}
          <div className="hidden sm:flex items-center relative">
            <input
              type="text"
              placeholder="Buscar smartphone..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-48 lg:w-56 bg-[#ebe8de]/70 hover:bg-[#ebe8de] focus:bg-white border border-[#dedad0] rounded-full py-1.5 pl-8 pr-3 text-xs text-[#121417] placeholder:text-[#888377] focus:outline-none focus:ring-1 focus:ring-[#0f1115] focus:border-[#0f1115] transition"
            />
            <Search className="w-3.5 h-3.5 text-[#888377] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Ícone de Suporte / Perfil */}
          <Link
            href="/#seminovos"
            className="p-2 text-[#4a4f59] hover:text-[#0f1115] rounded-full hover:bg-[#eae7dd] transition"
            title="Conta & Preferências"
            aria-label="Perfil"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Botão Pill Shop Now / Carrinho */}
          <button
            onClick={abrirGaveta}
            className="flex items-center gap-2 bg-[#0f1115] hover:bg-[#23272f] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Comprar</span>
            {quantidadeItens > 0 && (
              <span className="ml-1 bg-white text-[#0f1115] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {quantidadeItens}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
