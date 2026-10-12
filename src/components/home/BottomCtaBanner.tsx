"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";

export function BottomCtaBanner() {
  return (
    <section className="bg-[#0e1014] text-white py-12 sm:py-16 overflow-hidden relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Lado Esquerdo: Chamada de Ação */}
          <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 block">
              Pronto Para o Upgrade?
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              O Seu Próximo <br className="hidden sm:inline" />
              Smartphone Espera Por Você
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto lg:mx-0">
              Mais desempenho. Design icônico. Uma experiência sem travamentos com garantia total.
            </p>
            <div className="pt-2">
              <Link
                href="/#lineup"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-[#0e1014] font-bold px-6 py-3 rounded-full text-xs transition active:scale-95 shadow-md"
              >
                <span>Comprar Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Centro: Smartphone em Ângulo */}
          <div className="lg:col-span-3 relative flex items-center justify-center my-4 lg:my-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
              <Image
                src="/images/produtos/galaxy-s24-ultra.jpg"
                alt="Smartphone Premium Nexora"
                fill
                className="object-contain opacity-90 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* Lado Direito: Garantias e Selos de Confiança */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 sm:justify-around lg:justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                <Truck className="w-5 h-5 text-neutral-200" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Frete Grátis e Seguro</h4>
                <p className="text-[11px] text-neutral-400">Envio expresso para todo o Brasil</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                <ShieldCheck className="w-5 h-5 text-neutral-200" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Pagamento 100% Seguro</h4>
                <p className="text-[11px] text-neutral-400">Pix com 10% OFF ou 12x no cartão</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                <Headphones className="w-5 h-5 text-neutral-200" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Suporte Especialista</h4>
                <p className="text-[11px] text-neutral-400">Equipe técnica pronta para ajudar</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
