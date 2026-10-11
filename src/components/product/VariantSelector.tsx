"use client";

import { Check } from "lucide-react";
import { Produto, Variacao, Armazenamento } from "@/lib/types";

interface VariantSelectorProps {
  produto: Produto;
  variacaoSelecionada: Variacao;
  onSelecionarVariacao: (variacao: Variacao) => void;
}

export function VariantSelector({
  produto,
  variacaoSelecionada,
  onSelecionarVariacao,
}: VariantSelectorProps) {
  // Lista única de armazenamentos disponíveis
  const armazenamentos = Array.from(
    new Set(produto.variacoes.map((v) => v.armazenamento))
  );

  // Lista única de cores disponíveis
  const cores = Array.from(
    new Map(produto.variacoes.map((v) => [v.cor.nome, v.cor])).values()
  );

  const handleMudarArmazenamento = (arm: Armazenamento) => {
    const correspondente = produto.variacoes.find(
      (v) =>
        v.armazenamento === arm && v.cor.nome === variacaoSelecionada.cor.nome
    );
    if (correspondente) {
      onSelecionarVariacao(correspondente);
    } else {
      const primeiroDesseArm = produto.variacoes.find(
        (v) => v.armazenamento === arm
      );
      if (primeiroDesseArm) onSelecionarVariacao(primeiroDesseArm);
    }
  };

  const handleMudarCor = (corNome: string) => {
    const correspondente = produto.variacoes.find(
      (v) =>
        v.cor.nome === corNome &&
        v.armazenamento === variacaoSelecionada.armazenamento
    );
    if (correspondente) {
      onSelecionarVariacao(correspondente);
    } else {
      const primeiroDessaCor = produto.variacoes.find(
        (v) => v.cor.nome === corNome
      );
      if (primeiroDessaCor) onSelecionarVariacao(primeiroDessaCor);
    }
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Armazenamento */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
          Capacidade de Armazenamento:{" "}
          <span className="text-royal-600 font-extrabold">
            {variacaoSelecionada.armazenamento}
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {armazenamentos.map((arm) => {
            const isAtivo = variacaoSelecionada.armazenamento === arm;
            return (
              <button
                key={arm}
                onClick={() => handleMudarArmazenamento(arm)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition border ${
                  isAtivo
                    ? "bg-navy-950 text-white border-navy-950 shadow-xs"
                    : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
                }`}
              >
                {arm}
              </button>
            );
          })}
        </div>
      </div>

      {/* Seletor de Cor */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
          Cor do Aparelho:{" "}
          <span className="text-royal-600 font-extrabold">
            {variacaoSelecionada.cor.nome}
          </span>
        </label>
        <div className="flex flex-wrap items-center gap-3">
          {cores.map((cor) => {
            const isAtiva = variacaoSelecionada.cor.nome === cor.nome;
            return (
              <button
                key={cor.nome}
                onClick={() => handleMudarCor(cor.nome)}
                className={`flex items-center gap-2 py-1.5 px-3 rounded-full border text-xs font-medium transition ${
                  isAtiva
                    ? "border-navy-950 bg-ink-50 font-bold shadow-xs"
                    : "border-ink-200 bg-white hover:border-ink-300"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-ink-300 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: cor.hex }}
                >
                  {isAtiva && (
                    <Check
                      className={`w-2.5 h-2.5 ${
                        cor.hex.toLowerCase() === "#faf7f2" ||
                        cor.hex.toLowerCase() === "#ffffff"
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  )}
                </span>
                <span className="text-navy-950">{cor.nome}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
