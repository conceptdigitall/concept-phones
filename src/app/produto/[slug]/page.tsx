import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUTOS, obterProdutoPorSlug } from "@/data/produtos";
import { ProductDetailView } from "@/components/product/ProductDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUTOS.map((produto) => ({
    slug: produto.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const produto = obterProdutoPorSlug(slug);

  if (!produto) {
    return { title: "Produto não encontrado · Concept Phones" };
  }

  return {
    title: `${produto.nome} · Concept Phones`,
    description: produto.resumo,
  };
}

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const produto = obterProdutoPorSlug(slug);

  if (!produto) {
    notFound();
  }

  return <ProductDetailView produto={produto} />;
}
