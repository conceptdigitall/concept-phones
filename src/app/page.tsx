import { PRODUTOS } from "@/data/produtos";
import { HeroBanner } from "@/components/home/HeroBanner";
import { TrustBadges } from "@/components/home/TrustBadges";
import { DealsSection } from "@/components/home/DealsSection";
import { ProductGrid } from "@/components/home/ProductGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <TrustBadges />
      <DealsSection produtos={PRODUTOS} />
      <div id="apple" />
      <div id="samsung" />
      <div id="seminovos" />
      <ProductGrid produtos={PRODUTOS} />
    </div>
  );
}
