"use client";

import Link from "next/link";
import { Home, Apple, Smartphone, Sparkles, ShoppingBag } from "lucide-react";
import { useCarrinho } from "@/store/cart-store";

export function BottomNav() {
  const { totalItens, abrirGaveta } = useCarrinho();
  const quantidade = totalItens();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-ink-200 safe-bottom">
      <div className="grid grid-cols-5 h-14 items-center">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-ink-600 hover:text-royal-600 active:scale-95 transition"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Início</span>
        </Link>

        <Link
          href="/#apple"
          className="flex flex-col items-center justify-center text-ink-600 hover:text-royal-600 active:scale-95 transition"
        >
          <Apple className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">iPhones</span>
        </Link>

        <Link
          href="/#samsung"
          className="flex flex-col items-center justify-center text-ink-600 hover:text-royal-600 active:scale-95 transition"
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Galaxy</span>
        </Link>

        <Link
          href="/#seminovos"
          className="flex flex-col items-center justify-center text-ink-600 hover:text-royal-600 active:scale-95 transition"
        >
          <Sparkles className="w-5 h-5 text-gold-500" />
          <span className="text-[10px] font-medium mt-0.5">Seminovos</span>
        </Link>

        <button
          onClick={abrirGaveta}
          className="flex flex-col items-center justify-center text-ink-600 hover:text-royal-600 active:scale-95 transition relative"
          aria-label="Ver carrinho"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {quantidade > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-royal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {quantidade}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5">Carrinho</span>
        </button>
      </div>
    </nav>
  );
}
