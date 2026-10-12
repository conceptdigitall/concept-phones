"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PRODUTOS } from "@/data/produtos";

const MODELOS_LINEUP = [
  {
    id: "iphone-16-pro-max",
    nome: "Nexora X1 Pro",
    subtitulo: "Mais Potência. Mais Possibilidades.",
    precoPix: 8999,
    imagem: "/images/produtos/iphone-16-pro-max.jpg",
    slug: "iphone-16-pro-max",
    tag: "Flagship",
  },
  {
    id: "galaxy-s24-ultra",
    nome: "Nexora Ultra",
    subtitulo: "Para Criadores. Pelos Melhores Criadores.",
    precoPix: 7899,
    imagem: "/images/produtos/galaxy-s24-ultra.jpg",
    slug: "galaxy-s24-ultra",
    tag: "IA Nativa",
  },
  {
    id: "iphone-15-pro",
    nome: "Nexora X1",
    subtitulo: "Poder. Elegância. Sem Concessões.",
    precoPix: 6299,
    imagem: "/images/produtos/iphone-15-pro.jpg",
    slug: "iphone-15-pro",
    tag: "Titânio",
  },
  {
    id: "galaxy-s24",
    nome: "Nexora Lite",
    subtitulo: "Grandes Recursos. Excelente Custo.",
    precoPix: 4499,
    imagem: "/images/produtos/galaxy-s24.jpg",
    slug: "galaxy-s24",
    tag: "Compacto",
  },
];

export function LineupSection() {
  return (
    <section id="lineup" className="py-16 sm:py-20 bg-[#f6f5f0] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#787366] uppercase block mb-1">
              Modelos em Destaque
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0f1115]">
              Explore a Linha Nexora
            </h2>
          </div>
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1f2229] hover:text-black transition group"
          >
            <span>Ver Todos os Produtos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid de 4 Cards de Modelos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODELOS_LINEUP.map((modelo) => (
            <Link
              key={modelo.id}
              href={`/produto/${modelo.slug}`}
              className="group bg-white rounded-2xl p-5 border border-[#e4e0d4] hover:border-[#b8b3a5] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Tag sutil */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#736e61] bg-[#f3f0e7] px-2 py-0.5 rounded-full">
                    {modelo.tag}
                  </span>
                </div>

                {/* Foto do Aparelho */}
                <div className="relative w-full aspect-square my-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src={modelo.imagem}
                    alt={modelo.nome}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Título e Subtítulo */}
                <h3 className="text-sm font-bold text-[#0f1115] group-hover:text-black transition">
                  {modelo.nome}
                </h3>
                <p className="text-[11px] text-[#6b7280] mt-0.5 leading-snug">
                  {modelo.subtitulo}
                </p>
              </div>

              {/* Preço e Botão Seta */}
              <div className="pt-4 mt-4 border-t border-[#f0ede4] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#787366] block leading-none">
                    A partir de
                  </span>
                  <span className="text-sm font-black text-[#0f1115]">
                    R$ {modelo.precoPix.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f4f2ea] group-hover:bg-[#0f1115] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#22252a] group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
