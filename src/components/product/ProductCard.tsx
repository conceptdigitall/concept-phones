"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Battery, Shield, ArrowRight } from "lucide-react";
import { Produto } from "@/lib/types";
import { formatarMoeda, calcularParcelas } from "@/lib/formatters";
import { useFavoritos } from "@/store/favorites-store";
import { useCarrinho } from "@/store/cart-store";

interface ProductCardProps {
  produto: Produto;
}

export function ProductCard({ produto }: ProductCardProps) {
  const { isFavorito, alternarFavorito } = useFavoritos();
  const { adicionarItem } = useCarrinho();

  const variacaoPadrao = produto.variacoes[0];
  const precoPix = variacaoPadrao.precoPix;
  const precoCheio = variacaoPadrao.preco;
  const parcelamento = calcularParcelas(precoCheio, 12);
  const favoritado = isFavorito(produto.id);

  const handleCompraRapida = (e: React.MouseEvent) => {
    e.preventDefault();
    adicionarItem({
      variacaoId: variacaoPadrao.id,
      produtoId: produto.id,
      produtoNome: produto.nome,
      produtoSlug: produto.slug,
      marca: produto.marca,
      cor: variacaoPadrao.cor,
      armazenamento: variacaoPadrao.armazenamento,
      condicao: variacaoPadrao.condicao,
      saudeBateria: variacaoPadrao.saudeBateria,
      precoUnitario: variacaoPadrao.preco,
      precoPixUnitario: variacaoPadrao.precoPix,
      quantidade: 1,
      imagem: variacaoPadrao.imagem,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-ink-200/80 shadow-xs hover:shadow-md hover:border-royal-500/30 transition-all flex flex-col overflow-hidden">
      {/* Topo do Card: Badges & Favorito */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {produto.badge ? (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-950 text-gold-400 px-2.5 py-1 rounded-full shadow-xs">
            {produto.badge}
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            alternarFavorito(produto.id);
          }}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition shadow-xs ${
            favoritado
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-white/90 text-ink-400 hover:text-ink-700 hover:bg-white"
          }`}
          aria-label="Favoritar smartphone"
        >
          <Heart
            className={`w-4 h-4 ${favoritado ? "fill-red-500" : ""}`}
          />
        </button>
      </div>

      {/* Imagem do Produto */}
      <Link
        href={`/produto/${produto.slug}`}
        className="relative w-full aspect-square bg-gradient-to-b from-ink-50/60 to-white flex items-center justify-center p-6 overflow-hidden"
      >
        <Image
          src={variacaoPadrao.imagem}
          alt={produto.nome}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Conteúdo */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Tag de Marca e Condição */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-royal-700 bg-royal-50 px-2 py-0.5 rounded">
              {produto.marca}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                variacaoPadrao.condicao === "novo"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-gold-50 text-gold-700"
              }`}
            >
              <Shield className="w-2.5 h-2.5" />
              {variacaoPadrao.condicao === "novo" ? "Novo Lacrado" : "Seminovo A+"}
            </span>
          </div>

          {/* Nome */}
          <Link href={`/produto/${produto.slug}`}>
            <h3 className="text-sm font-bold text-navy-950 group-hover:text-royal-600 transition line-clamp-1">
              {produto.nome}
            </h3>
          </Link>

          {/* Bateria & Armazenamento */}
          <div className="flex items-center gap-2 text-[11px] text-ink-500">
            <span>{variacaoPadrao.armazenamento}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Battery className="w-3 h-3" />
              {variacaoPadrao.saudeBateria.split(" ")[0]} {variacaoPadrao.saudeBateria.split(" ")[1] || ""}
            </span>
          </div>
        </div>

        {/* Preços */}
        <div className="pt-2 border-t border-ink-100 space-y-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-navy-950">
              {formatarMoeda(precoPix)}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              Pix 10% OFF
            </span>
          </div>
          <p className="text-[11px] text-ink-500">
            ou {formatarMoeda(precoCheio)} em até {parcelamento.parcelas}x de{" "}
            {formatarMoeda(parcelamento.valorParcela)}
          </p>
        </div>

        {/* Botão de Ação */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Link
            href={`/produto/${produto.slug}`}
            className="flex items-center justify-center gap-1 bg-ink-100 hover:bg-ink-200 text-ink-800 text-xs font-semibold py-2 px-3 rounded-xl transition"
          >
            <span>Ver Detalhes</span>
          </Link>
          <button
            onClick={handleCompraRapida}
            className="flex items-center justify-center gap-1 bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition shadow-xs active:scale-95"
          >
            <span>Comprar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
