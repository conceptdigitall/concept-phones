import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "Concept Phones · E-commerce de iPhones e Samsung com Procedência",
  description:
    "Smartphones Apple e Samsung novos lacrados com garantia e seminovos revisados com saúde de bateria atestada. Até 10% OFF no Pix ou 12x no cartão.",
  keywords: [
    "iPhone",
    "Samsung Galaxy",
    "iPhone 16",
    "Galaxy S24 Ultra",
    "celulares seminovos",
    "comprar celular",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#060e20",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen flex flex-col bg-surface-bg text-ink-900">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <CartDrawer />
        <WhatsAppButton />
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
