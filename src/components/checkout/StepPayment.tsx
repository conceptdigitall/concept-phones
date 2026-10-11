"use client";

import { useState } from "react";
import { QrCode, CreditCard, ShieldCheck, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { formatarMoeda, calcularParcelas } from "@/lib/formatters";
import { MetodoPagamento } from "@/lib/types";

interface StepPaymentProps {
  subtotal: number;
  subtotalPix: number;
  valorFrete: number;
  metodoPagamento: MetodoPagamento;
  onSelecionarMetodo: (metodo: MetodoPagamento) => void;
  onVoltar: () => void;
  onFinalizar: () => void;
  carregando: boolean;
}

export function StepPayment({
  subtotal,
  subtotalPix,
  valorFrete,
  metodoPagamento,
  onSelecionarMetodo,
  onVoltar,
  onFinalizar,
  carregando,
}: StepPaymentProps) {
  const [cartaoNumero, setCartaoNumero] = useState("");
  const [cartaoNome, setCartaoNome] = useState("");
  const [cartaoValidade, setCartaoValidade] = useState("");
  const [cartaoCvv, setCartaoCvv] = useState("");
  const [parcelasSelecionadas, setParcelasSelecionadas] = useState(1);

  const totalCartao = subtotal + valorFrete;
  const totalPix = subtotalPix + valorFrete;
  const economiaPix = totalCartao - totalPix;

  const parcelamento = calcularParcelas(totalCartao, 12);
  const opcoesParcelamento = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const valor = totalCartao / num;
    return { parcelas: num, valorParcela: valor };
  });

  const handleNumeroCartao = (val: string) => {
    const nums = val.replace(/\D/g, "").slice(0, 16);
    const formatado = nums.replace(/(\d{4})/g, "$1 ").trim();
    setCartaoNumero(formatado);
  };

  const handleValidade = (val: string) => {
    const nums = val.replace(/\D/g, "").slice(0, 4);
    if (nums.length <= 2) {
      setCartaoValidade(nums);
    } else {
      setCartaoValidade(`${nums.slice(0, 2)}/${nums.slice(2)}`);
    }
  };

  const isCartaoValido =
    cartaoNumero.replace(/\D/g, "").length === 16 &&
    cartaoNome.trim().length >= 3 &&
    cartaoValidade.length === 5 &&
    cartaoCvv.replace(/\D/g, "").length >= 3;

  const podeFinalizar =
    metodoPagamento === "pix" || (metodoPagamento === "cartao" && isCartaoValido);

  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-6 space-y-6 shadow-xs">
      <div className="border-b border-ink-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-navy-950 text-base">3. Forma de Pagamento</h3>
          <p className="text-xs text-ink-500">
            Ambiente seguro com criptografia de ponta a ponta Mercado Pago.
          </p>
        </div>
        <button
          onClick={onVoltar}
          className="text-xs font-semibold text-ink-500 hover:text-navy-950 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar</span>
        </button>
      </div>

      {/* Seleção de Métodos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Opção Pix */}
        <div
          onClick={() => onSelecionarMetodo("pix")}
          className={`p-4 rounded-xl border cursor-pointer transition relative flex flex-col justify-between ${
            metodoPagamento === "pix"
              ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
              : "border-ink-200 hover:border-ink-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-navy-950">Pix Instantâneo</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              10% OFF
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-base font-extrabold text-emerald-700 block">
              {formatarMoeda(totalPix)}
            </span>
            <span className="text-[11px] text-ink-500 block">
              Aprovação em segundos · QR Code direto na tela
            </span>
          </div>
        </div>

        {/* Opção Cartão */}
        <div
          onClick={() => onSelecionarMetodo("cartao")}
          className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
            metodoPagamento === "cartao"
              ? "border-royal-600 bg-royal-50/40 shadow-xs"
              : "border-ink-200 hover:border-ink-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-royal-600" />
              <span className="text-xs font-bold text-navy-950">Cartão de Crédito</span>
            </div>
            <span className="text-[10px] font-semibold text-ink-600 bg-ink-100 px-2 py-0.5 rounded-full">
              Até 12x
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-base font-extrabold text-navy-950 block">
              {formatarMoeda(totalCartao)}
            </span>
            <span className="text-[11px] text-ink-500 block">
              em até 12x de {formatarMoeda(parcelamento.valorParcela)}
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo Dinâmico por Método */}
      {metodoPagamento === "pix" ? (
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Desconto exclusivo de {formatarMoeda(economiaPix)} aplicado!</span>
          </div>
          <p className="text-emerald-800 leading-relaxed text-[11px]">
            Ao clicar em &ldquo;Finalizar Pedido&rdquo;, o QR Code oficial do Pix será gerado instantaneamente na tela com o código Copia e Cola para pagamento no seu banco.
          </p>
        </div>
      ) : (
        /* Formulário de Cartão de Crédito */
        <div className="space-y-4 pt-2 animate-fade">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
              Número do Cartão de Crédito
            </label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cartaoNumero}
              onChange={(e) => handleNumeroCartao(e.target.value)}
              maxLength={19}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
              Nome Impresso no Cartão
            </label>
            <input
              type="text"
              placeholder="Como impresso no cartão"
              value={cartaoNome}
              onChange={(e) => setCartaoNome(e.target.value.toUpperCase())}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600 uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Validade (MM/AA)
              </label>
              <input
                type="text"
                placeholder="MM/AA"
                value={cartaoValidade}
                onChange={(e) => handleValidade(e.target.value)}
                maxLength={5}
                className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Código CVV
              </label>
              <input
                type="text"
                placeholder="123"
                value={cartaoCvv}
                onChange={(e) => setCartaoCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                maxLength={4}
                className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600 font-mono"
              />
            </div>
          </div>

          {/* Seletor de Parcelamento */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
              Quantidade de Parcelas
            </label>
            <select
              value={parcelasSelecionadas}
              onChange={(e) => setParcelasSelecionadas(Number(e.target.value))}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
            >
              {opcoesParcelamento.map((p) => (
                <option key={p.parcelas} value={p.parcelas}>
                  {p.parcelas}x de {formatarMoeda(p.valorParcela)}{" "}
                  {p.parcelas <= 6 ? "(Sem juros)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Botão de Finalização */}
      <div className="pt-3 space-y-2">
        <button
          onClick={onFinalizar}
          disabled={!podeFinalizar || carregando}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition disabled:opacity-40 disabled:pointer-events-none text-sm sm:text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
        >
          {carregando ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processando Pedido Seguro...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5 text-gold-400" />
              <span>
                Finalizar Compra ({formatarMoeda(metodoPagamento === "pix" ? totalPix : totalCartao)})
              </span>
            </>
          )}
        </button>

        <p className="text-[11px] text-ink-500 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-royal-600" />
          <span>Pagamento Seguro processado com criptografia bancária 256-bit</span>
        </p>
      </div>
    </div>
  );
}
