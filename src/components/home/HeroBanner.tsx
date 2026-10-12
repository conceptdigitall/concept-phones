"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Smartphone, Cpu, Battery, ArrowRight, RotateCw, Sparkles } from "lucide-react";
import { useCarrinho } from "@/store/cart-store";
import { PRODUTOS } from "@/data/produtos";

const OPCOES_ARMAZENAMENTO = [
  { capacidade: "128GB", precoPix: 6749, precoCartao: 7499 },
  { capacidade: "256GB", precoPix: 7469, precoCartao: 8299 },
  { capacidade: "512GB", precoPix: 8369, precoCartao: 9299 },
  { capacidade: "1TB", precoPix: 9899, precoCartao: 10999 },
];

const SPECS_DESTAQUE = [
  {
    icone: Camera,
    titulo: "Câmera AI de 50MP",
    descricao: "Capte cada detalhe com nitidez cinematográfica e sensor HDR.",
  },
  {
    icone: Smartphone,
    titulo: "Display AMOLED 120Hz",
    descricao: "Mais brilho, transições fluidas e contraste infinito.",
  },
  {
    icone: Cpu,
    titulo: "Snapdragon 8 Gen 3 / A18 Pro",
    descricao: "Poder de sobra com inteligência artificial nativa no chip.",
  },
  {
    icone: Battery,
    titulo: "Bateria Para o Dia Todo",
    descricao: "Autonomia de até 29h e recarga ultra-rápida de 65W.",
  },
];

type ModoVisualizacao = "duo" | "frente" | "traseira";

export function HeroBanner() {
  const [selecionado, setSelecionado] = useState(OPCOES_ARMAZENAMENTO[1]); // 256GB default
  const [modoVisual, setModoVisual] = useState<ModoVisualizacao>("duo");
  const [estaVirado3D, setEstaVirado3D] = useState(false);
  const { adicionarItem } = useCarrinho();

  const produtoPrincipal = PRODUTOS[0]; // iPhone 16 Pro Max

  const handleComprar = () => {
    if (!produtoPrincipal) return;
    const variacao =
      produtoPrincipal.variacoes.find(
        (v) => v.armazenamento === selecionado.capacidade
      ) || produtoPrincipal.variacoes[0];

    adicionarItem({
      variacaoId: variacao.id,
      produtoId: produtoPrincipal.id,
      produtoNome: produtoPrincipal.nome,
      produtoSlug: produtoPrincipal.slug,
      marca: produtoPrincipal.marca,
      cor: variacao.cor,
      armazenamento: variacao.armazenamento,
      condicao: variacao.condicao,
      saudeBateria: variacao.saudeBateria,
      precoUnitario: variacao.preco,
      precoPixUnitario: variacao.precoPix,
      quantidade: 1,
      imagem: variacao.imagem,
    });
  };

  const alternarGiro3D = () => {
    setEstaVirado3D(!estaVirado3D);
    if (modoVisual === "duo") {
      setModoVisual("frente");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-[#f5f4ef] via-[#eceae2] to-[#faf9f5] animate-mono-gradient text-[#0f1115] pt-12 pb-16 lg:py-20 border-b border-[#e5e1d5]">
      {/* Luz ambiente monocromática suave */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-white/60 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#dedad0]/40 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#ebe8df] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Coluna Esquerda: Informações & Seletor de Armazenamento */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#787366] uppercase block">
              A Nova Geração
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] text-[#121417]">
              Nexora X1 <br />
              <span className="text-[#555a64] font-medium text-3xl sm:text-4xl lg:text-[44px]">
                Projetado Para o Futuro
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#5d6370] leading-relaxed max-w-md mx-auto lg:mx-0">
              Fotografia profissional em titânio e vidro cerâmico. Aparelhos 100% originais com laudo de bateria atestado e garantia oficial de até 1 ano.
            </p>

            {/* Preço dinâmico e capacidades */}
            <div className="pt-2 space-y-3">
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-xs text-[#787366]">A partir de</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0f1115]">
                  R$ {selecionado.precoPix.toLocaleString("pt-BR")}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  10% OFF no Pix
                </span>
              </div>
              <p className="text-[11px] text-[#787366]">
                ou R$ {selecionado.precoCartao.toLocaleString("pt-BR")} em até 12x sem juros
              </p>

              {/* Chips de Capacidade Interativos */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
                {OPCOES_ARMAZENAMENTO.map((opcao) => {
                  const ativo = opcao.capacidade === selecionado.capacidade;
                  return (
                    <button
                      key={opcao.capacidade}
                      onClick={() => setSelecionado(opcao)}
                      className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                        ativo
                          ? "bg-[#0f1115] text-white shadow-sm ring-1 ring-[#0f1115]"
                          : "bg-white text-[#4a505c] hover:bg-[#eae7dd] border border-[#dcd7cb]"
                      }`}
                    >
                      {opcao.capacidade}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                onClick={handleComprar}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f1115] hover:bg-[#23272f] text-white font-semibold px-6 py-3.5 rounded-full shadow-md active:scale-95 transition text-xs"
              >
                <span>Comprar Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                href="/#lineup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-transparent hover:bg-black/5 text-[#22252a] font-medium px-5 py-3.5 rounded-full transition text-xs"
              >
                <span>Ver Modelos</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </div>

          {/* Coluna Central: Smartphone 3D Interativo com Flutuação e Rotação */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center py-6 lg:py-0">
            
            {/* Controles de Visão 3D (Frente / Traseira / Ambos) */}
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-[#dcd7cb] p-1 rounded-full mb-4 shadow-xs z-30">
              <button
                onClick={() => { setModoVisual("duo"); setEstaVirado3D(false); }}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                  modoVisual === "duo"
                    ? "bg-[#0f1115] text-white"
                    : "text-[#555a64] hover:text-[#0f1115]"
                }`}
              >
                Visão Dupla
              </button>

              <button
                onClick={() => { setModoVisual("frente"); setEstaVirado3D(false); }}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                  modoVisual === "frente" && !estaVirado3D
                    ? "bg-[#0f1115] text-white"
                    : "text-[#555a64] hover:text-[#0f1115]"
                }`}
              >
                Frente
              </button>

              <button
                onClick={() => { setModoVisual("traseira"); setEstaVirado3D(true); }}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                  modoVisual === "traseira" || estaVirado3D
                    ? "bg-[#0f1115] text-white"
                    : "text-[#555a64] hover:text-[#0f1115]"
                }`}
              >
                Traseira
              </button>

              <button
                onClick={alternarGiro3D}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#1a1d22] hover:bg-[#edeae0] px-2.5 py-1 rounded-full transition active:scale-95 ml-1"
                title="Girar Aparelho em 3D"
              >
                <RotateCw className="w-3 h-3" />
                <span className="hidden sm:inline">Virar 3D</span>
              </button>
            </div>

            {/* Container com perspectiva 3D e levitação */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center perspective-1200">
              
              {/* Sombra de chão dinâmica e sincronizada com a levitação */}
              <div className="absolute bottom-4 w-56 sm:w-72 h-14 bg-black/25 rounded-full blur-xl animate-float-shadow pointer-events-none" />
              <div className="absolute bottom-2 w-48 sm:w-60 h-8 bg-[#1f2024]/20 rounded-full blur-md animate-float-shadow pointer-events-none" />

              {/* Elemento Smartphone Flutuante com Giro 3D */}
              <div
                onClick={alternarGiro3D}
                className={`relative z-10 w-full h-[360px] sm:h-[440px] flex items-center justify-center cursor-pointer animate-float-device transform-style-3d transition-transform duration-700 ease-out ${
                  estaVirado3D ? "rotate-y-180" : ""
                }`}
                title="Toque para virar o iPhone em 3D"
              >
                {/* 1. Visão Dupla (ambos os lados em PNG 100% transparente) */}
                {modoVisual === "duo" && !estaVirado3D && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/produtos/iphone-16-duo-transparent.png"
                      alt="iPhone 16 Pro Max Frente e Traseira"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                    />
                  </div>
                )}

                {/* 2. Visão Frente (Face frontal com tela e Dynamic Island) */}
                {(modoVisual !== "duo" || estaVirado3D) && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center backface-hidden">
                      <Image
                        src="/images/produtos/iphone-16-front-transparent.png"
                        alt="iPhone 16 Pro Max Frente - Display Super Retina"
                        fill
                        priority
                        className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                      />
                    </div>

                    {/* 3. Visão Traseira (Titânio Natural e Câmeras Triplas) */}
                    <div className="absolute inset-0 flex items-center justify-center rotate-y-180 backface-hidden">
                      <Image
                        src="/images/produtos/iphone-16-back-transparent.png"
                        alt="iPhone 16 Pro Max Traseira - Titânio Natural"
                        fill
                        priority
                        className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Tag Flutuante de Destaque */}
              <div className="absolute top-2 right-4 sm:right-6 bg-white/90 backdrop-blur-md border border-[#dedad0] shadow-sm rounded-full py-1.5 px-3.5 flex items-center gap-1.5 z-20 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-[#1f2329] uppercase tracking-wider">
                  Pronta Entrega
                </span>
              </div>

              {/* Dica de interação sutil */}
              <div className="absolute -bottom-2 text-[10px] text-[#7c786c] flex items-center gap-1 bg-white/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#e5e1d5] pointer-events-none">
                <RotateCw className="w-2.5 h-2.5" />
                <span>Toque para virar em 3D</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Especificações Chave com Ícones Minimalistas */}
          <div className="lg:col-span-3 space-y-4 max-w-sm mx-auto lg:mx-0">
            {SPECS_DESTAQUE.map((item, idx) => {
              const Icone = item.icone;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-[#e4e0d4] transition shadow-xs flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#edeae0] group-hover:bg-[#0f1115] text-[#1a1d22] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Icone className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-[#0f1115]">
                      {item.titulo}
                    </h3>
                    <p className="text-[11px] text-[#636976] leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
