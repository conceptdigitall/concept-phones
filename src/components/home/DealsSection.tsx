"use client";

import { useState, useEffect } from "react";
import { Zap, Timer } from "lucide-react";
import { Produto } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

interface DealsSectionProps {
  produtos: Produto[];
}

export function DealsSection({ produtos }: DealsSectionProps) {
  const [tempoRestante, setTempoRestante] = useState({
    horas: 9,
    minutos: 42,
    segundos: 18,
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev.segundos > 0) {
          return { ...prev, segundos: prev.segundos - 1 };
        } else if (prev.minutos > 0) {
          return { ...prev, minutos: prev.minutos - 1, segundos: 59 };
        } else if (prev.horas > 0) {
          return { horas: prev.horas - 1, minutos: 59, segundos: 59 };
        }
        return { horas: 12, minutos: 0, segundos: 0 };
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const ofertas = produtos.filter((p) => p.ofertaRelampago);

  if (ofertas.length === 0) return null;

  return (
    <section id="ofertas" className="py-12 bg-gold-50/50 border-b border-gold-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Cabeçalho da Seção com Cronômetro */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-gold-500 text-navy-950">
                <Zap className="w-4 h-4 fill-navy-950" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 tracking-tight">
                Ofertas Relâmpago Pix
              </h2>
            </div>
            <p className="text-xs text-ink-600">
              Descontos de 10% exclusivos à vista com estoque limitado e envio prioritário.
            </p>
          </div>

          {/* Cronômetro */}
          <div className="flex items-center gap-2 bg-navy-950 text-white px-4 py-2 rounded-xl shrink-0 self-start sm:self-auto shadow-xs">
            <Timer className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-semibold text-ink-200">Termina em:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-xs text-gold-400">
              <span className="bg-navy-900 px-1.5 py-0.5 rounded">
                {String(tempoRestante.horas).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="bg-navy-900 px-1.5 py-0.5 rounded">
                {String(tempoRestante.minutos).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="bg-navy-900 px-1.5 py-0.5 rounded">
                {String(tempoRestante.segundos).padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>

        {/* Grade de Produtos em Oferta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ofertas.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  );
}
