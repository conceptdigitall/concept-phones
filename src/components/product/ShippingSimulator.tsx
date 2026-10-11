"use client";

import { useState } from "react";
import { Truck, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { formatarCep, formatarMoeda } from "@/lib/formatters";
import { consultarViaCep, calcularOpcoesFrete, OpcaoFrete } from "@/lib/frete";

interface ShippingSimulatorProps {
  subtotal: number;
}

export function ShippingSimulator({ subtotal }: ShippingSimulatorProps) {
  const [cep, setCep] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [cidadeUf, setCidadeUf] = useState<string | null>(null);
  const [opcoes, setOpcoes] = useState<OpcaoFrete[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    const limpo = cep.replace(/\D/g, "");
    if (limpo.length !== 8) {
      setErro("Informe um CEP válido com 8 dígitos.");
      return;
    }

    setCarregando(true);
    setErro(null);

    const dados = await consultarViaCep(limpo);
    if (!dados) {
      setErro("CEP não localizado. Verifique e tente novamente.");
      setCarregando(false);
      return;
    }

    setCidadeUf(`${dados.localidade}/${dados.uf}`);
    setOpcoes(calcularOpcoesFrete(limpo, subtotal));
    setCarregando(false);
  };

  return (
    <div className="bg-ink-50/70 rounded-2xl p-4 border border-ink-200/80 space-y-3">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-royal-600" />
        <span className="text-xs font-bold text-navy-950 uppercase tracking-wider">
          Simular Frete e Prazo de Entrega
        </span>
      </div>

      <form onSubmit={handleConsultar} className="flex gap-2">
        <input
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(formatarCep(e.target.value))}
          maxLength={9}
          className="flex-1 bg-white border border-ink-200 rounded-xl px-3 py-2 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
        />
        <button
          type="submit"
          disabled={carregando}
          className="bg-navy-950 hover:bg-royal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition disabled:opacity-50 shrink-0"
        >
          {carregando ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Calcular"
          )}
        </button>
      </form>

      {erro && <p className="text-[11px] text-red-600 font-medium">{erro}</p>}

      {cidadeUf && opcoes && (
        <div className="pt-2 space-y-2 border-t border-ink-200/60 animate-fade">
          <div className="flex items-center gap-1.5 text-xs text-ink-600">
            <MapPin className="w-3.5 h-3.5 text-royal-600" />
            <span>Entrega para: </span>
            <strong className="text-navy-950">{cidadeUf}</strong>
          </div>

          <div className="space-y-1.5 pt-1">
            {opcoes.map((op) => (
              <div
                key={op.id}
                className="flex items-center justify-between p-2 rounded-lg bg-white border border-ink-100 text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-navy-950 block leading-tight">
                      {op.nome}
                    </span>
                    <span className="text-[10px] text-ink-500 block leading-tight">
                      {op.descricao}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-navy-950 block">
                    {op.valor === 0 ? (
                      <span className="text-emerald-700 font-bold">Grátis</span>
                    ) : (
                      formatarMoeda(op.valor)
                    )}
                  </span>
                  <span className="text-[10px] text-ink-500">
                    {op.prazoDias === 0 ? "Hoje" : `em até ${op.prazoDias} dias`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
