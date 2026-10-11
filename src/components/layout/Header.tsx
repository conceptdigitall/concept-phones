"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Heart, Smartphone, ShieldCheck } from "lucide-react";
import { useCarrinho } from "@/store/cart-store";
import { useFavoritos } from "@/store/favorites-store";

export function Header() {
  const [termoBusca, setTermoBusca] = useState("");
  const { totalItens, abrirGaveta } = useCarrinho();
  const { produtoIds } = useFavoritos();

  const quantidadeItens = totalItens();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-ink-200">
      {/* Top Banner de Confiança */}
      <div className="bg-navy-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span className="font-medium text-ink-100">
              Smartphones 100% Originais · Garantia até 1 ano · Pix com 10% OFF
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-ink-400 text-xs">
            <span>Envio com seguro para todo o Brasil</span>
            <span>Atendimento via WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-950 to-royal-700 flex items-center justify-center text-white shadow-md shadow-royal-700/20 group-hover:scale-105 transition-transform">
            <Smartphone className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-navy-950 block leading-tight">
              Concept<span className="text-royal-600">Phones</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gold-600 font-semibold block leading-none">
              Apple & Samsung
            </span>
          </div>
        </Link>

        {/* Barra de Busca Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar iPhone 16, Galaxy S24, seminovos..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full bg-ink-100/80 border border-ink-200 rounded-full py-2 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600 transition"
            />
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink-700">
          <Link href="/#apple" className="hover:text-royal-600 transition">
            iPhones
          </Link>
          <Link href="/#samsung" className="hover:text-royal-600 transition">
            Samsung Galaxy
          </Link>
          <Link href="/#seminovos" className="hover:text-royal-600 transition flex items-center gap-1">
            <span>Seminovos</span>
            <span className="text-[10px] bg-gold-100 text-gold-600 px-1.5 py-0.5 rounded-full font-bold">
              Bateria OK
            </span>
          </Link>
        </nav>

        {/* Ações (Favoritos & Carrinho) */}
        <div className="flex items-center gap-2">
          <Link
            href="/#seminovos"
            className="hidden sm:flex relative p-2.5 rounded-full hover:bg-ink-100 text-ink-700 transition"
            title="Favoritos"
          >
            <Heart className="w-5 h-5" />
            {produtoIds.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-royal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {produtoIds.length}
              </span>
            )}
          </Link>

          <button
            onClick={abrirGaveta}
            className="relative flex items-center gap-2 bg-navy-950 text-white hover:bg-royal-700 py-2 px-3.5 sm:px-4 rounded-full transition shadow-sm"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <span className="hidden sm:inline text-xs font-semibold">Carrinho</span>
            {quantidadeItens > 0 && (
              <span className="bg-gold-500 text-navy-950 text-xs font-bold px-2 py-0.5 rounded-full">
                {quantidadeItens}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
