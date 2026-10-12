"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const DEPOIMENTOS = [
  {
    id: 1,
    nome: "Sarah M.",
    cargo: "Compradora Verificada",
    avaliacao: 5,
    texto:
      "A qualidade da câmera e a rapidez do aparelho são inacreditáveis. O processo de compra foi transparente, entrega antes do prazo e bateria 100% atestada.",
  },
  {
    id: 2,
    nome: "Lucas F.",
    cargo: "Comprador Verificado",
    avaliacao: 5,
    texto:
      "Peguei o modelo na condição seminovo e parece que tirei da caixa lacrado da loja oficial. Veio com laudo de teste e garantia de 1 ano. Recomendo demais!",
  },
  {
    id: 3,
    nome: "Camila R.",
    cargo: "Compradora Verificada",
    avaliacao: 5,
    texto:
      "O desconto de 10% no Pix valeu muito a pena. O atendimento no WhatsApp tirou todas as dúvidas em menos de 2 minutos.",
  },
];

export function CustomerReviews() {
  const [indice, setIndice] = useState(0);
  const atual = DEPOIMENTOS[indice];

  const anterior = () => {
    setIndice((prev) => (prev === 0 ? DEPOIMENTOS.length - 1 : prev - 1));
  };

  const proximo = () => {
    setIndice((prev) => (prev === DEPOIMENTOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="avaliacoes" className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e4e0d4] shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#787366]">
            Avaliações de Clientes
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={anterior}
              className="w-7 h-7 rounded-full border border-[#dedad0] hover:bg-[#f5f3ec] flex items-center justify-center text-[#2b2f38] transition active:scale-95"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={proximo}
              className="w-7 h-7 rounded-full border border-[#dedad0] hover:bg-[#f5f3ec] flex items-center justify-center text-[#2b2f38] transition active:scale-95"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Estrelas */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(atual.avaliacao)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Citação */}
        <blockquote className="text-xs sm:text-sm text-[#2b2f38] italic leading-relaxed">
          &ldquo;{atual.texto}&rdquo;
        </blockquote>
      </div>

      {/* Autor */}
      <div className="flex items-center gap-3 pt-4 mt-4 border-t border-[#f2efe6]">
        <div className="w-8 h-8 rounded-full bg-[#f0ede4] flex items-center justify-center font-bold text-xs text-[#0f1115]">
          {atual.nome.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-[#0f1115]">{atual.nome}</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          </div>
          <span className="text-[10px] text-[#787f8e] block leading-none">
            {atual.cargo}
          </span>
        </div>
      </div>
    </div>
  );
}
