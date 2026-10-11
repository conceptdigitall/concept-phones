"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCarrinho } from "@/store/cart-store";
import { formatarMoeda } from "@/lib/formatters";

export default function CarrinhoPage() {
  const {
    itens,
    atualizarQuantidade,
    removerItem,
    subtotal,
    subtotalPix,
  } = useCarrinho();

  const valorSubtotal = subtotal();
  const valorPix = subtotalPix();
  const economiaPix = valorSubtotal - valorPix;

  if (itens.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-ink-100 mx-auto flex items-center justify-center text-ink-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-navy-950">Seu carrinho está vazio</h2>
        <p className="text-xs text-ink-500">
          Explore nossos modelos de iPhone e Samsung Galaxy para adicionar ao carrinho.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-royal-600 text-white font-bold text-xs py-3 px-6 rounded-full hover:bg-royal-700 transition"
        >
          <span>Explorar Catálogo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-navy-950 transition font-medium mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continuar comprando</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
          Carrinho de Compras
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lista de Itens */}
        <div className="lg:col-span-8 space-y-3">
          {itens.map((item) => (
            <div
              key={item.variacaoId}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white border border-ink-200 rounded-2xl shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-ink-50 rounded-xl overflow-hidden shrink-0 border border-ink-100 flex items-center justify-center">
                  <Image
                    src={item.imagem}
                    alt={item.produtoNome}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-navy-950 text-sm">
                    {item.produtoNome}
                  </h3>
                  <p className="text-xs text-ink-500">
                    {item.armazenamento} · {item.cor.nome} ·{" "}
                    <span className="font-semibold text-navy-900">
                      {item.condicao === "novo" ? "Novo Lacrado" : "Seminovo"}
                    </span>
                  </p>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold inline-block">
                    {item.saudeBateria}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-ink-100">
                {/* Controles de Quantidade */}
                <div className="flex items-center border border-ink-200 rounded-xl bg-ink-50">
                  <button
                    onClick={() =>
                      atualizarQuantidade(item.variacaoId, item.quantidade - 1)
                    }
                    className="p-1.5 text-ink-600 hover:text-navy-950 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-3 text-navy-950">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() =>
                      atualizarQuantidade(item.variacaoId, item.quantidade + 1)
                    }
                    className="p-1.5 text-ink-600 hover:text-navy-950 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Preço */}
                <div className="text-right">
                  <span className="text-sm font-extrabold text-navy-950 block">
                    {formatarMoeda(item.precoPixUnitario * item.quantidade)}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    à vista no Pix
                  </span>
                </div>

                {/* Remover */}
                <button
                  onClick={() => removerItem(item.variacaoId)}
                  className="text-ink-400 hover:text-red-500 transition p-1"
                  title="Remover do carrinho"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo Lateral */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-ink-200 p-6 space-y-4 shadow-xs sticky top-24">
          <h3 className="font-bold text-navy-950 text-base border-b border-ink-100 pb-3">
            Resumo do Pedido
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal:</span>
              <span>{formatarMoeda(valorSubtotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Desconto Pix (10% OFF):</span>
              <span>- {formatarMoeda(economiaPix)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-navy-950 text-base pt-3 border-t border-ink-100">
              <span>Total no Pix:</span>
              <span className="text-emerald-700">{formatarMoeda(valorPix)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-royal-600 hover:bg-royal-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition active:scale-98 text-sm"
          >
            <span>Ir para o Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2 text-[11px] text-ink-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
            <span>Compra protegida com entrega imediata e garantia total.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
