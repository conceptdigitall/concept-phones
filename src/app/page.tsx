import { PRODUTOS } from "@/data/produtos";
import { HeroBanner } from "@/components/home/HeroBanner";
import { LineupSection } from "@/components/home/LineupSection";
import { SpecsComparison } from "@/components/home/SpecsComparison";
import { ShowcaseBanners } from "@/components/home/ShowcaseBanners";
import { AccessoriesSection } from "@/components/home/AccessoriesSection";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { BottomCtaBanner } from "@/components/home/BottomCtaBanner";
import { ProductGrid } from "@/components/home/ProductGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f5f0]">
      {/* 1. Hero Banner Principal com Seletor de GB e Destaques Técnicos */}
      <HeroBanner />

      {/* 2. Vitrine da Linha Nexora (Featured Models) */}
      <LineupSection />

      {/* 3. Tabela Comparativa de Especificações Lado a Lado */}
      <SpecsComparison />

      {/* 4. Showcases Imersivos de Câmera e Performance Flagship */}
      <ShowcaseBanners />

      {/* 5. Seção Integrada: Acessórios Originais & Depoimentos de Clientes */}
      <section className="py-16 sm:py-20 bg-[#faf9f5] border-b border-[#e5e1d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Lado Esquerdo (8 colunas): Acessórios */}
            <div className="lg:col-span-8">
              <AccessoriesSection />
            </div>

            {/* Lado Direito (4 colunas): Avaliações de Clientes */}
            <div className="lg:col-span-4">
              <CustomerReviews />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Banner de Conversão Inferior (Ready to Upgrade?) */}
      <BottomCtaBanner />

      {/* Âncoras para navegação rápida */}
      <div id="apple" />
      <div id="samsung" />
      <div id="seminovos" />

      {/* 7. Catálogo Completo com Filtros Dinâmicos */}
      <ProductGrid produtos={PRODUTOS} />
    </div>
  );
}
