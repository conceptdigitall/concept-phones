"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Smartphone, ShoppingBag } from "lucide-react";
import { useCarrinho } from "@/store/cart-store";
import { DadosEntrega, MetodoPagamento, Pedido } from "@/lib/types";
import { StepIdentity } from "@/components/checkout/StepIdentity";
import { StepShipping } from "@/components/checkout/StepShipping";
import { StepPayment } from "@/components/checkout/StepPayment";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { itens, subtotal, subtotalPix, limparCarrinho } = useCarrinho();

  const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3>(1);
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>("pix");
  const [carregando, setCarregando] = useState(false);

  const [dadosEntrega, setDadosEntrega] = useState<Partial<DadosEntrega>>({
    nome: "",
    email: "",
    whatsapp: "",
    cpf: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    metodoEnvio: "retirada",
    valorFrete: 0,
    prazoDias: 0,
  });

  const handleCampoChange = (campo: string, valor: unknown) => {
    setDadosEntrega((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleFinalizarPedido = async () => {
    setCarregando(true);
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itens,
          entrega: dadosEntrega,
          metodoPagamento,
          subtotal: subtotal(),
          subtotalPix: subtotalPix(),
          frete: dadosEntrega.valorFrete || 0,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar pedido");
      }

      const pedidoCriado: Pedido = await res.json();

      // Salva no LocalStorage para tela de confirmação
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `pedido_${pedidoCriado.id}`,
          JSON.stringify(pedidoCriado)
        );
      }

      limparCarrinho();
      router.push(`/pedido/${pedidoCriado.id}`);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao processar o seu pedido. Tente novamente.");
      setCarregando(false);
    }
  };

  if (itens.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-ink-100 mx-auto flex items-center justify-center text-ink-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-navy-950">Seu carrinho está vazio</h2>
        <p className="text-xs text-ink-500">
          Você precisa adicionar um smartphone ao carrinho antes de ir para o checkout.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-royal-600 text-white font-bold text-xs py-3 px-6 rounded-full hover:bg-royal-700 transition"
        >
          <Smartphone className="w-4 h-4 text-gold-400" />
          <span>Ver Catálogo de Smartphones</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Topo do Checkout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-200 pb-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-navy-950 transition font-medium mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para a loja</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 tracking-tight">
            Checkout Transparente Seguro
          </h1>
        </div>

        {/* Indicador de Passos */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          {[
            { num: 1, label: "Identificação" },
            { num: 2, label: "Entrega" },
            { num: 3, label: "Pagamento" },
          ].map((passo) => {
            const isAtivo = etapaAtual === passo.num;
            const isConcluido = etapaAtual > passo.num;
            return (
              <div key={passo.num} className="flex items-center gap-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isConcluido
                      ? "bg-emerald-600 text-white"
                      : isAtivo
                      ? "bg-royal-600 text-white"
                      : "bg-ink-200 text-ink-600"
                  }`}
                >
                  {isConcluido ? <Check className="w-3.5 h-3.5" /> : passo.num}
                </span>
                <span
                  className={`hidden sm:inline ${
                    isAtivo ? "text-navy-950 font-bold" : "text-ink-500"
                  }`}
                >
                  {passo.label}
                </span>
                {passo.num < 3 && <span className="text-ink-300">→</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Principal do Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Esquerda: Etapas do Formulário */}
        <div className="lg:col-span-7">
          {etapaAtual === 1 && (
            <StepIdentity
              nome={dadosEntrega.nome || ""}
              email={dadosEntrega.email || ""}
              whatsapp={dadosEntrega.whatsapp || ""}
              cpf={dadosEntrega.cpf || ""}
              onChange={handleCampoChange}
              onAvancar={() => setEtapaAtual(2)}
            />
          )}

          {etapaAtual === 2 && (
            <StepShipping
              entrega={dadosEntrega}
              subtotal={subtotalPix()}
              onChange={handleCampoChange}
              onVoltar={() => setEtapaAtual(1)}
              onAvancar={() => setEtapaAtual(3)}
            />
          )}

          {etapaAtual === 3 && (
            <StepPayment
              subtotal={subtotal()}
              subtotalPix={subtotalPix()}
              valorFrete={dadosEntrega.valorFrete || 0}
              metodoPagamento={metodoPagamento}
              onSelecionarMetodo={setMetodoPagamento}
              onVoltar={() => setEtapaAtual(2)}
              onFinalizar={handleFinalizarPedido}
              carregando={carregando}
            />
          )}
        </div>

        {/* Coluna Direita: Resumo do Pedido */}
        <div className="lg:col-span-5 sticky top-24">
          <OrderSummary
            itens={itens}
            subtotal={subtotal()}
            subtotalPix={subtotalPix()}
            valorFrete={dadosEntrega.valorFrete || 0}
            metodoPagamento={metodoPagamento}
          />
        </div>
      </div>
    </div>
  );
}
