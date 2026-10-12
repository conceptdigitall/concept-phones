"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Battery, Layers, Wifi } from "lucide-react";

export function ShowcaseBanners() {
  return (
    <section id="showcase" className="py-16 sm:py-20 bg-[#f6f5f0] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Banner 1: Showcase de Câmera (Coluna Esquerda, mais larga) */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-[#0f1115] text-white p-7 sm:p-10 flex flex-col justify-between min-h-[380px] shadow-sm">
            {/* Imagem de Fundo de Paisagem com Overlay Escuro */}
            <div className="absolute inset-0 z-0 opacity-40">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/80 to-transparent z-10" />
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-700 via-neutral-900 to-black" />
            </div>

            {/* Imagem do Módulo de Câmera no Canto Direito */}
            <div className="absolute -right-10 -bottom-10 w-72 sm:w-80 h-72 sm:h-80 opacity-60 sm:opacity-90 pointer-events-none z-10">
              <Image
                src="/images/produtos/iphone-16-pro-max.jpg"
                alt="Módulo de Câmera Pro"
                fill
                className="object-contain transform scale-125 rotate-6"
              />
            </div>

            {/* Conteúdo do Banner */}
            <div className="relative z-20 max-w-md space-y-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a6a090] block">
                Showcase de Fotografia
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Cada Momento em <br />
                Detalhes Perfeitos
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                De paisagens monumentais aos momentos mais íntimos, o sensor de 48MP/50MP com zoom óptico periscópio e processamento neural captura fidelidade de cores impecável.
              </p>
            </div>

            <div className="relative z-20 pt-6">
              <Link
                href="/#catalogo"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-[#0f1115] font-semibold px-5 py-2.5 rounded-full text-xs transition active:scale-95 shadow-sm"
              >
                <span>Explorar Câmeras</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Banner 2: Showcase de Performance (Coluna Direita) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-[#e4e0d4] p-7 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#787366] block">
                Desempenho Flagship
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0f1115]">
                Potência Que Acompanha Você
              </h3>
              <p className="text-xs text-[#616773] leading-relaxed">
                Engenharia de precisão para máxima velocidade, resfriamento otimizado e confiabilidade para o seu dia todo.
              </p>
            </div>

            {/* Grid 2x2 com métricas de desempenho */}
            <div className="grid grid-cols-2 gap-3 pt-6">
              <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe7dc] space-y-1">
                <Cpu className="w-4 h-4 text-[#0f1115]" />
                <h4 className="text-xs font-bold text-[#0f1115]">
                  Snapdragon 8 Gen 3 / A18 Pro
                </h4>
                <p className="text-[10px] text-[#717784]">
                  Processamento ultra veloz
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe7dc] space-y-1">
                <Battery className="w-4 h-4 text-[#0f1115]" />
                <h4 className="text-xs font-bold text-[#0f1115]">
                  Bateria de 5.000mAh
                </h4>
                <p className="text-[10px] text-[#717784]">
                  Autonomia de até 29h
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe7dc] space-y-1">
                <Layers className="w-4 h-4 text-[#0f1115]" />
                <h4 className="text-xs font-bold text-[#0f1115]">
                  Até 12GB RAM
                </h4>
                <p className="text-[10px] text-[#717784]">
                  Multitarefa sem travamentos
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe7dc] space-y-1">
                <Wifi className="w-4 h-4 text-[#0f1115]" />
                <h4 className="text-xs font-bold text-[#0f1115]">
                  5G & Wi-Fi 7
                </h4>
                <p className="text-[10px] text-[#717784]">
                  Downloads instantâneos
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
