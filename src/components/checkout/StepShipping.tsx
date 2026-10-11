"use client";

import { useState } from "react";
import { MapPin, Truck, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { formatarCep, formatarMoeda } from "@/lib/formatters";
import { consultarViaCep, calcularOpcoesFrete, OpcaoFrete } from "@/lib/frete";
import { DadosEntrega } from "@/lib/types";

interface StepShippingProps {
  entrega: Partial<DadosEntrega>;
  subtotal: number;
  onChange: (campo: keyof DadosEntrega, valor: unknown) => void;
  onVoltar: () => void;
  onAvancar: () => void;
}

export function StepShipping({
  entrega,
  subtotal,
  onChange,
  onVoltar,
  onAvancar,
}: StepShippingProps) {
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [opcoesFrete, setOpcoesFrete] = useState<OpcaoFrete[]>(
    calcularOpcoesFrete(entrega.cep || "", subtotal)
  );

  const handleBuscarCep = async (cepInformado: string) => {
    const limpo = cepInformado.replace(/\D/g, "");
    onChange("cep", formatarCep(cepInformado));

    if (limpo.length === 8) {
      setCarregandoCep(true);
      const res = await consultarViaCep(limpo);
      if (res) {
        onChange("logradouro", res.logradouro);
        onChange("bairro", res.bairro);
        onChange("cidade", res.localidade);
        onChange("uf", res.uf);
        const fretes = calcularOpcoesFrete(limpo, subtotal);
        setOpcoesFrete(fretes);
        if (!entrega.metodoEnvio) {
          onChange("metodoEnvio", fretes[0].id);
          onChange("valorFrete", fretes[0].valor);
          onChange("prazoDias", fretes[0].prazoDias);
        }
      }
      setCarregandoCep(false);
    }
  };

  const handleSelecionarFrete = (op: OpcaoFrete) => {
    onChange("metodoEnvio", op.id);
    onChange("valorFrete", op.valor);
    onChange("prazoDias", op.prazoDias);
  };

  const isValido =
    (entrega.cep || "").replace(/\D/g, "").length === 8 &&
    (entrega.logradouro || "").trim().length > 0 &&
    (entrega.numero || "").trim().length > 0 &&
    (entrega.bairro || "").trim().length > 0 &&
    (entrega.cidade || "").trim().length > 0 &&
    Boolean(entrega.metodoEnvio);

  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-6 space-y-6 shadow-xs">
      <div className="border-b border-ink-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-navy-950 text-base">2. Endereço e Opção de Envio</h3>
          <p className="text-xs text-ink-500">
            Informe onde o smartphone será entregue com seguro total.
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* CEP */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            CEP
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="00000-000"
              value={entrega.cep || ""}
              onChange={(e) => handleBuscarCep(e.target.value)}
              maxLength={9}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
            />
            {carregandoCep && (
              <Loader2 className="w-4 h-4 text-royal-600 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>

        {/* Logradouro */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            Rua / Avenida
          </label>
          <input
            type="text"
            placeholder="Nome da rua"
            value={entrega.logradouro || ""}
            onChange={(e) => onChange("logradouro", e.target.value)}
            className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
          />
        </div>

        {/* Número */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            Número
          </label>
          <input
            type="text"
            placeholder="123"
            value={entrega.numero || ""}
            onChange={(e) => onChange("numero", e.target.value)}
            className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
          />
        </div>

        {/* Complemento */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            Complemento (Opcional)
          </label>
          <input
            type="text"
            placeholder="Apto, Bloco..."
            value={entrega.complemento || ""}
            onChange={(e) => onChange("complemento", e.target.value)}
            className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
          />
        </div>

        {/* Bairro */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            Bairro
          </label>
          <input
            type="text"
            placeholder="Bairro"
            value={entrega.bairro || ""}
            onChange={(e) => onChange("bairro", e.target.value)}
            className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
          />
        </div>

        {/* Cidade e UF */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            Cidade
          </label>
          <input
            type="text"
            placeholder="Cidade"
            value={entrega.cidade || ""}
            onChange={(e) => onChange("cidade", e.target.value)}
            className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            Estado (UF)
          </label>
          <input
            type="text"
            placeholder="SP"
            maxLength={2}
            value={entrega.uf || ""}
            onChange={(e) => onChange("uf", e.target.value.toUpperCase())}
            className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 px-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600 uppercase"
          />
        </div>
      </div>

      {/* Opções de Envio */}
      <div className="pt-2 space-y-3">
        <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
          Selecione a Modalidade de Envio
        </label>
        <div className="space-y-2">
          {opcoesFrete.map((op) => {
            const isSelecionado = entrega.metodoEnvio === op.id;
            return (
              <div
                key={op.id}
                onClick={() => handleSelecionarFrete(op)}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                  isSelecionado
                    ? "border-royal-600 bg-royal-50/40 shadow-xs"
                    : "border-ink-200 hover:border-ink-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelecionado
                        ? "border-royal-600 bg-royal-600"
                        : "border-ink-300"
                    }`}
                  >
                    {isSelecionado && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-navy-950 block">
                      {op.nome}
                    </span>
                    <span className="text-[11px] text-ink-500 block">
                      {op.descricao} · {op.prazoDias === 0 ? "Entrega Hoje" : `Até ${op.prazoDias} dias`}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-navy-950">
                    {op.valor === 0 ? (
                      <span className="text-emerald-700 font-extrabold">Grátis</span>
                    ) : (
                      formatarMoeda(op.valor)
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3">
        <button
          onClick={onAvancar}
          disabled={!isValido}
          className="w-full bg-navy-950 hover:bg-royal-700 text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-40 disabled:pointer-events-none text-xs sm:text-sm"
        >
          Continuar para o Pagamento Transparente
        </button>
      </div>
    </div>
  );
}
