"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Smartphone, Cpu, Battery, ArrowRight, Check } from "lucide-react";
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
    titulo: "Snapdragon 8 Gen 3",
    descricao: "Poder de sobra com inteligência artificial nativa no chip.",
  },
  {
    icone: Battery,
    titulo: "Bateria Para o Dia Todo",
    descricao: "Autonomia de até 29h e recarga ultra-rápida de 65W.",
  },
];

export function HeroBanner() {
  const [selecionado, setSelecionado] = useState(OPCOES_ARMAZENAMENTO[1]); // 256GB default
  const { adicionarItem } = useCarrinho();

  // Produto principal para compra direta
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f6f2] via-[#f3f1ea] to-[#ebe8df] text-[#0f1115] pt-12 pb-16 lg:py-20 border-b border-[#e5e1d5]">
      {/* Luz ambiente e textura mineral suave de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white/40 blur-3xl pointer-events-none rounded-full" />
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
              Experimente desempenho inigualável, fotografia profissional com sensor periscópio e um design esculpido para quem exige o melhor em tecnologia móvel.
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

          {/* Coluna Central: Smartphone em Pedestal Mineral */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6 lg:py-0">
            {/* Pedestal Mineral Estilizado */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center">
              
              {/* Efeito de Rocha / Pedestal 3D CSS */}
              <div className="absolute bottom-4 w-64 sm:w-80 h-16 bg-gradient-to-b from-[#dcd7c9] to-[#c2bcae] rounded-full blur-xs shadow-2xl opacity-90 transform rotate-1 scale-y-50" />
              <div className="absolute bottom-2 w-72 sm:w-96 h-20 bg-black/15 rounded-full blur-xl pointer-events-none" />

              {/* Aparelho em exibição */}
              <div className="relative z-10 w-full h-[360px] sm:h-[440px] flex items-center justify-center transition-transform hover:scale-102 duration-500">
                <Image
                  src="/images/produtos/iphone-16-pro-max.jpg"
                  alt="Nexora X1 Smartphone Flagship"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Tag Flutuante de Destaque */}
              <div className="absolute top-6 right-4 sm:right-6 bg-white/90 backdrop-blur-md border border-[#e2decfa0] shadow-sm rounded-full py-1.5 px-3.5 flex items-center gap-1.5 z-20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-[#1f2329] uppercase tracking-wider">
                  Pronta Entrega
                </span>
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
