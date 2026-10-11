"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, MessageCircle, ShieldCheck } from "lucide-react";
import { Produto, Variacao } from "@/lib/types";
import { ProductGallery } from "./ProductGallery";
import { VariantSelector } from "./VariantSelector";
import { ShippingSimulator } from "./ShippingSimulator";
import { ProductSpecs } from "./ProductSpecs";
import { formatarMoeda, calcularParcelas, gerarLinkWhatsApp } from "@/lib/formatters";
import { useCarrinho } from "@/store/cart-store";

interface ProductDetailViewProps {
  produto: Produto;
}

export function ProductDetailView({ produto }: ProductDetailViewProps) {
  const [variacaoSelecionada, setVariacaoSelecionada] = useState<Variacao>(
    produto.variacoes[0]
  );
  const { adicionarItem } = useCarrinho();

  const precoPix = variacaoSelecionada.precoPix;
  const precoCheio = variacaoSelecionada.preco;
  const parcelamento = calcularParcelas(precoCheio, 12);

  const handleAdicionarAoCarrinho = () => {
    adicionarItem({
      variacaoId: variacaoSelecionada.id,
      produtoId: produto.id,
      produtoNome: produto.nome,
      produtoSlug: produto.slug,
      marca: produto.marca,
      cor: variacaoSelecionada.cor,
      armazenamento: variacaoSelecionada.armazenamento,
      condicao: variacaoSelecionada.condicao,
      saudeBateria: variacaoSelecionada.saudeBateria,
      precoUnitario: variacaoSelecionada.preco,
      precoPixUnitario: variacaoSelecionada.precoPix,
      quantidade: 1,
      imagem: variacaoSelecionada.imagem,
    });
  };

  const linkWhatsApp = gerarLinkWhatsApp(
    produto.nome,
    variacaoSelecionada.armazenamento,
    variacaoSelecionada.cor.nome
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Botão Voltar */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-600 hover:text-royal-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao catálogo</span>
        </Link>
      </div>

      {/* Grid Principal: Galeria & Compra */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Coluna Esquerda: Galeria */}
        <div className="lg:col-span-6">
          <ProductGallery
            variacaoSelecionada={variacaoSelecionada}
            nomeProduto={produto.nome}
          />
        </div>

        {/* Coluna Direita: Informações & Compra */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-royal-700 bg-royal-50 px-2.5 py-1 rounded-md">
              {produto.marca}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
              {produto.nome}
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              {produto.resumo}
            </p>
          </div>

          {/* Bloco de Preços */}
          <div className="p-4 rounded-2xl bg-white border border-ink-200/90 shadow-xs space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                {formatarMoeda(precoPix)}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                10% OFF no Pix
              </span>
            </div>
            <p className="text-xs text-ink-600">
              ou <strong className="text-navy-950">{formatarMoeda(precoCheio)}</strong> em até{" "}
              {parcelamento.parcelas}x de{" "}
              <strong className="text-navy-950">
                {formatarMoeda(parcelamento.valorParcela)}
              </strong>{" "}
              no cartão
            </p>
          </div>

          {/* Seletor de Variações */}
          <VariantSelector
            produto={produto}
            variacaoSelecionada={variacaoSelecionada}
            onSelecionarVariacao={setVariacaoSelecionada}
          />

          {/* Simulador de Frete */}
          <ShippingSimulator subtotal={precoPix} />

          {/* Botões de Ação */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleAdicionarAoCarrinho}
              className="w-full flex items-center justify-center gap-2 bg-royal-600 hover:bg-royal-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-royal-600/25 transition active:scale-98 text-sm sm:text-base"
            >
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <span>Adicionar ao Carrinho</span>
            </button>

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold py-3 px-6 rounded-2xl transition active:scale-98 text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Dúvidas sobre este aparelho? Fale no WhatsApp</span>
            </a>
          </div>

          {/* Aviso de Confiança */}
          <div className="flex items-center gap-2 text-xs text-ink-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
            <span>
              Aparelho 100% original com garantia, nota fiscal e laudo de bateria.
            </span>
          </div>
        </div>
      </div>

      {/* Seção Inferior: Ficha Técnica */}
      <ProductSpecs
        especificacoes={produto.especificacoes}
        destaques={produto.destaques}
      />
    </div>
  );
}
