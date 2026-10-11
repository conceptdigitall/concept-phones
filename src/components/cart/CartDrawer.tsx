"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useCarrinho } from "@/store/cart-store";
import { formatarMoeda } from "@/lib/formatters";

export function CartDrawer() {
  const {
    itens,
    gavetaAberta,
    fecharGaveta,
    atualizarQuantidade,
    removerItem,
    subtotal,
    subtotalPix,
  } = useCarrinho();

  if (!gavetaAberta) return null;

  const valorSubtotal = subtotal();
  const valorPix = subtotalPix();
  const economiaPix = valorSubtotal - valorPix;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs transition-opacity animate-fade"
        onClick={fecharGaveta}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-entrar">
        {/* Topo da Gaveta */}
        <div className="p-4 border-b border-ink-200 flex items-center justify-between bg-ink-50/50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-navy-950 text-base">Seu Carrinho</h3>
            <span className="text-xs bg-royal-100 text-royal-700 font-semibold px-2 py-0.5 rounded-full">
              {itens.length} {itens.length === 1 ? "item" : "itens"}
            </span>
          </div>
          <button
            onClick={fecharGaveta}
            className="p-1.5 rounded-full text-ink-500 hover:text-navy-950 hover:bg-ink-200/60 transition"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {itens.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-ink-100 mx-auto flex items-center justify-center text-ink-400">
                <Zap className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-navy-950 text-base">
                  Seu carrinho está vazio
                </p>
                <p className="text-xs text-ink-500">
                  Explore nossos iPhones e aparelhos Samsung disponíveis.
                </p>
              </div>
              <button
                onClick={fecharGaveta}
                className="inline-flex items-center gap-2 bg-royal-600 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-royal-700 transition"
              >
                Ver Smartphones
              </button>
            </div>
          ) : (
            itens.map((item) => (
              <div
                key={item.variacaoId}
                className="flex gap-3 p-3 bg-white border border-ink-200/80 rounded-xl hover:border-ink-300 transition"
              >
                {/* Imagem do Produto */}
                <div className="relative w-18 h-18 bg-ink-50 rounded-lg overflow-hidden shrink-0 border border-ink-100 flex items-center justify-center">
                  <Image
                    src={item.imagem}
                    alt={item.produtoNome}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                {/* Detalhes do Produto */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-navy-950 truncate">
                      {item.produtoNome}
                    </h4>
                    <button
                      onClick={() => removerItem(item.variacaoId)}
                      className="text-ink-400 hover:text-red-500 transition p-1"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-ink-500">
                    {item.armazenamento} · {item.cor.nome} ·{" "}
                    <span className="font-medium text-navy-900">
                      {item.condicao === "novo" ? "Novo Lacrado" : "Seminovo"}
                    </span>
                  </p>

                  <div className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                    {item.saudeBateria}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-navy-950">
                      {formatarMoeda(item.precoPixUnitario * item.quantidade)}{" "}
                      <span className="text-[10px] font-normal text-emerald-600">no Pix</span>
                    </span>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center border border-ink-200 rounded-lg bg-ink-50">
                      <button
                        onClick={() =>
                          atualizarQuantidade(
                            item.variacaoId,
                            item.quantidade - 1
                          )
                        }
                        className="p-1 text-ink-600 hover:text-navy-950 transition"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-2 text-navy-950">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() =>
                          atualizarQuantidade(
                            item.variacaoId,
                            item.quantidade + 1
                          )
                        }
                        className="p-1 text-ink-600 hover:text-navy-950 transition"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé da Gaveta com Valores */}
        {itens.length > 0 && (
          <div className="p-4 border-t border-ink-200 bg-ink-50/50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal (cartão em até 12x):</span>
                <span>{formatarMoeda(valorSubtotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-navy-950 text-sm">
                <span className="flex items-center gap-1">
                  <span>Total à vista (Pix):</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.2 rounded">
                    10% OFF
                  </span>
                </span>
                <span className="text-emerald-700">{formatarMoeda(valorPix)}</span>
              </div>
              {economiaPix > 0 && (
                <p className="text-[11px] text-emerald-600 text-right">
                  Você economiza {formatarMoeda(economiaPix)} pagando no Pix!
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-ink-500 bg-white p-2 rounded-lg border border-ink-200">
              <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
              <span>Checkout criptografado e garantia de entrega imediata.</span>
            </div>

            <Link
              href="/checkout"
              onClick={fecharGaveta}
              className="w-full flex items-center justify-center gap-2 bg-royal-600 hover:bg-royal-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition active:scale-98 text-sm"
            >
              <span>Fechar Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
