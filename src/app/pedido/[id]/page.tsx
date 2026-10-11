"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { Pedido } from "@/lib/types";
import { formatarMoeda } from "@/lib/formatters";

export default function PedidoConfirmadoPage() {
  const params = useParams();
  const id = params?.id as string;

  const [pedido, setPedido] = useState<Pedido | null>(() => {
    if (typeof window !== "undefined" && id) {
      const salvo = localStorage.getItem(`pedido_${id}`);
      if (salvo) {
        try {
          return JSON.parse(salvo);
        } catch {
          return null;
        }
      }
    }
    return null;
  });
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && id && !pedido) {
      const salvo = localStorage.getItem(`pedido_${id}`);
      if (salvo) {
        try {
          const parsed = JSON.parse(salvo);
          queueMicrotask(() => setPedido(parsed));
        } catch {
          // Fallback
        }
      }
    }
  }, [id, pedido]);

  const handleCopiarPix = () => {
    if (pedido?.copiaColaPix) {
      navigator.clipboard.writeText(pedido.copiaColaPix);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
  };

  if (!pedido) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
        <h2 className="text-2xl font-extrabold text-navy-950">
          Pedido Realizado com Sucesso!
        </h2>
        <p className="text-xs text-ink-500">
          Carregando informações do seu comprovante de compra...
        </p>
      </div>
    );
  }

  const isPix = pedido.metodoPagamento === "pix";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Topo de Sucesso */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
          {isPix ? "Quase lá! Realize o pagamento via Pix" : "Pedido Confirmado com Sucesso!"}
        </h1>
        <p className="text-xs sm:text-sm text-ink-600">
          Código do Pedido: <strong className="text-navy-950">{pedido.codigo}</strong> · Enviamos a confirmação para {pedido.entrega.email}
        </p>
      </div>

      {/* Caixa Pix se for Pix */}
      {isPix && (
        <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm border-b border-emerald-100 pb-3">
            <QrCode className="w-5 h-5 text-emerald-600" />
            <span>Pague via Pix com 10% de Desconto</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* QR Code */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-ink-50 rounded-2xl border border-ink-200">
              {pedido.qrCodePix ? (
                <div className="relative w-48 h-48 bg-white p-2 rounded-xl shadow-xs">
                  <Image
                    src={pedido.qrCodePix}
                    alt="QR Code Pix"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : null}
              <span className="text-[11px] text-ink-500 mt-2 font-medium">
                Abra o app do seu banco e aponte a câmera
              </span>
            </div>

            {/* Código Copia e Cola */}
            <div className="md:col-span-7 space-y-3">
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Ou copie o código Pix abaixo:
              </label>
              <div className="p-3 bg-ink-50 rounded-xl border border-ink-200 text-xs font-mono break-all text-ink-700 max-h-24 overflow-y-auto select-all">
                {pedido.copiaColaPix}
              </div>

              <button
                onClick={handleCopiarPix}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md active:scale-98 text-xs sm:text-sm"
              >
                {copiado ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Código Pix Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Código Pix Copia e Cola</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-ink-500 text-center">
                ⏱ O QR Code é válido por 15 minutos. A confirmação é automática.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resumo do Pedido e Destino */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Endereço de Entrega */}
        <div className="bg-white rounded-2xl border border-ink-200 p-5 space-y-2 text-xs">
          <h3 className="font-bold text-navy-950 text-sm border-b border-ink-100 pb-2">
            Dados de Entrega
          </h3>
          <p>
            <strong className="text-navy-950">Destinatário:</strong> {pedido.entrega.nome}
          </p>
          <p>
            <strong className="text-navy-950">Endereço:</strong> {pedido.entrega.logradouro}, {pedido.entrega.numero} {pedido.entrega.complemento}
          </p>
          <p>
            <strong className="text-navy-950">Bairro/Cidade:</strong> {pedido.entrega.bairro} - {pedido.entrega.cidade}/{pedido.entrega.uf}
          </p>
          <p>
            <strong className="text-navy-950">CEP:</strong> {pedido.entrega.cep}
          </p>
          <p>
            <strong className="text-navy-950">Modalidade:</strong> {pedido.entrega.metodoEnvio.toUpperCase()}
          </p>
        </div>

        {/* Resumo Financeiro */}
        <div className="bg-white rounded-2xl border border-ink-200 p-5 space-y-2 text-xs">
          <h3 className="font-bold text-navy-950 text-sm border-b border-ink-100 pb-2">
            Valores do Pedido
          </h3>
          <div className="flex justify-between text-ink-600">
            <span>Subtotal:</span>
            <span>{formatarMoeda(pedido.subtotal)}</span>
          </div>
          {pedido.descontoPix > 0 && (
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Desconto Pix:</span>
              <span>- {formatarMoeda(pedido.descontoPix)}</span>
            </div>
          )}
          <div className="flex justify-between text-ink-600">
            <span>Frete com Seguro:</span>
            <span>{pedido.frete === 0 ? "Grátis" : formatarMoeda(pedido.frete)}</span>
          </div>
          <div className="flex justify-between font-extrabold text-navy-950 text-sm pt-2 border-t border-ink-100">
            <span>Total Final:</span>
            <span className="text-emerald-700">{formatarMoeda(pedido.total)}</span>
          </div>
        </div>
      </div>

      {/* Ações Finais */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink-100 hover:bg-ink-200 text-ink-900 font-bold py-3 px-6 rounded-full transition text-xs sm:text-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Voltar para a Loja</span>
        </Link>

        <a
          href={`https://wa.me/5513999999999?text=${encodeURIComponent(
            `Olá! Acabei de fazer o pedido ${pedido.codigo} na Concept Phones e gostaria de acompanhar o envio.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition text-xs sm:text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Acompanhar no WhatsApp</span>
        </a>
      </div>

      {/* Selo Garantia */}
      <div className="flex items-center justify-center gap-2 text-xs text-ink-500 pt-2">
        <ShieldCheck className="w-4 h-4 text-gold-500" />
        <span>Garantia de procedência com suporte direto da Concept Phones.</span>
      </div>
    </div>
  );
}
