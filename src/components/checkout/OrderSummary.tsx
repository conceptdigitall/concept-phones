import Image from "next/image";
import { ItemCarrinho } from "@/lib/types";
import { formatarMoeda } from "@/lib/formatters";
import { ShieldCheck, Truck } from "lucide-react";

interface OrderSummaryProps {
  itens: ItemCarrinho[];
  subtotal: number;
  subtotalPix: number;
  valorFrete: number;
  metodoPagamento: "pix" | "cartao";
}

export function OrderSummary({
  itens,
  subtotal,
  subtotalPix,
  valorFrete,
  metodoPagamento,
}: OrderSummaryProps) {
  const isPix = metodoPagamento === "pix";
  const valorBase = isPix ? subtotalPix : subtotal;
  const totalGeral = valorBase + valorFrete;
  const descontoPix = subtotal - subtotalPix;

  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-6 space-y-6 shadow-xs">
      <h3 className="font-bold text-navy-950 text-base border-b border-ink-100 pb-3">
        Resumo da Compra ({itens.length} {itens.length === 1 ? "item" : "itens"})
      </h3>

      {/* Lista de Itens */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {itens.map((item) => (
          <div
            key={item.variacaoId}
            className="flex items-center gap-3 text-xs pb-3 border-b border-ink-100 last:border-0 last:pb-0"
          >
            <div className="relative w-12 h-12 bg-ink-50 rounded-lg overflow-hidden shrink-0 border border-ink-100 flex items-center justify-center">
              <Image
                src={item.imagem}
                alt={item.produtoNome}
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-navy-950 truncate">
                {item.produtoNome}
              </h4>
              <p className="text-[11px] text-ink-500">
                {item.armazenamento} · {item.cor.nome} (x{item.quantidade})
              </p>
            </div>
            <div className="text-right">
              <span className="font-bold text-navy-950 block">
                {formatarMoeda(
                  (isPix ? item.precoPixUnitario : item.precoUnitario) *
                    item.quantidade
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotais & Descontos */}
      <div className="space-y-2 text-xs border-t border-ink-100 pt-4">
        <div className="flex justify-between text-ink-600">
          <span>Subtotal:</span>
          <span>{formatarMoeda(subtotal)}</span>
        </div>

        {isPix && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Desconto Pix (10% OFF):</span>
            <span>- {formatarMoeda(descontoPix)}</span>
          </div>
        )}

        <div className="flex justify-between text-ink-600">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            <span>Frete:</span>
          </span>
          <span>
            {valorFrete === 0 ? (
              <span className="text-emerald-700 font-semibold">Grátis</span>
            ) : (
              formatarMoeda(valorFrete)
            )}
          </span>
        </div>

        <div className="flex justify-between font-extrabold text-navy-950 text-base pt-2 border-t border-ink-100">
          <span>Total:</span>
          <span className={isPix ? "text-emerald-700" : "text-navy-950"}>
            {formatarMoeda(totalGeral)}
          </span>
        </div>
      </div>

      {/* Selo de Garantia */}
      <div className="bg-ink-50 p-3 rounded-xl flex items-center gap-2.5 text-xs text-ink-600">
        <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0" />
        <span className="leading-tight text-[11px]">
          Garantia total de fábrica ou 90 dias com nossa bancada técnica especializada.
        </span>
      </div>
    </div>
  );
}
