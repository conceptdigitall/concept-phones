import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Zap, BatteryCharging } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-8 pb-14 md:py-16">
      {/* Luz ambiente de fundo (sem roxo: azul marinho e dourado suave) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Lado Esquerdo: Conteúdo */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-navy-800/80 border border-gold-500/30 rounded-full px-3.5 py-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-semibold text-gold-400 uppercase tracking-wider text-[11px]">
                Novos Lacrados & Seminovos Premium
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              O seu próximo <span className="text-white">iPhone</span> ou{" "}
              <span className="text-royal-500">Galaxy</span> com procedência e laudo de bateria.
            </h1>

            <p className="text-sm sm:text-base text-ink-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Compre com a segurança de aparelhos 100% originais testados em bancada técnica. Até 10% de desconto no Pix ou em até 12x no cartão de crédito com envio seguro.
            </p>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/#apple"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-royal-600 hover:bg-royal-700 text-white font-bold px-6 py-3.5 rounded-full shadow-lg shadow-royal-600/25 transition active:scale-98 text-sm"
              >
                <span>Ver Modelos Apple</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#samsung"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white font-semibold border border-ink-700 px-6 py-3.5 rounded-full transition active:scale-98 text-sm"
              >
                <span>Ver Samsung Galaxy</span>
              </Link>
            </div>

            {/* Mini Destaques */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-navy-800 text-left">
              <div className="flex items-center gap-2 text-xs text-ink-300">
                <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-tight text-[11px] sm:text-xs">
                  Bateria Original Atestada
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-300">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="leading-tight text-[11px] sm:text-xs">
                  Garantia de até 1 Ano
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-300">
                <Zap className="w-4 h-4 text-royal-400 shrink-0" />
                <span className="leading-tight text-[11px] sm:text-xs">
                  Pix 10% OFF Imediato
                </span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Imagem Hero Dupla */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-navy-800 to-navy-900/60 rounded-3xl p-6 border border-navy-700/60 shadow-2xl flex items-center justify-center">
              {/* Imagem do Produto Principal */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/images/produtos/iphone-16-pro-max.jpg"
                  alt="iPhone 16 Pro Max e Galaxy S24 Ultra"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Float Badge Superior */}
              <div className="absolute top-4 left-4 bg-navy-950/90 backdrop-blur-md border border-gold-500/40 rounded-xl px-3 py-1.5 shadow-lg">
                <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">
                  Top de Linha
                </span>
                <span className="text-xs font-bold text-white">
                  iPhone 16 Pro Max & S24 Ultra
                </span>
              </div>

              {/* Float Badge Inferior */}
              <div className="absolute -bottom-3 right-4 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-300">
                  Pronta Entrega no Estoque
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
