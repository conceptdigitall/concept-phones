import { NextResponse } from "next/server";
import { Pedido } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itens, entrega, metodoPagamento, subtotal, subtotalPix, frete } = body;

    if (!itens || itens.length === 0 || !entrega) {
      return NextResponse.json(
        { erro: "Dados do pedido incompletos" },
        { status: 400 }
      );
    }

    const codigo = `CP-${Math.floor(10000 + Math.random() * 90000)}`;
    const id = `ped_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const isPix = metodoPagamento === "pix";
    const valorBase = isPix ? subtotalPix : subtotal;
    const total = valorBase + frete;
    const descontoPix = subtotal - subtotalPix;

    // Payload dinâmico simulado de Pix copia-e-cola com formato EMV
    const copiaColaPix = isPix
      ? `00020101021226840014br.gov.bcb.pix2562pix.conceptphones.com.br/qr/v2/${id}520400005303986540${total.toFixed(2)}5802BR5914Concept Phones6009Sao Paulo62070503***6304ABCD`
      : undefined;

    const qrCodePix = isPix
      ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
          copiaColaPix || ""
        )}`
      : undefined;

    const novoPedido: Pedido = {
      id,
      codigo,
      criadoEm: new Date().toISOString(),
      itens,
      entrega,
      subtotal,
      frete,
      descontoPix: isPix ? descontoPix : 0,
      total,
      metodoPagamento,
      status: isPix ? "pendente" : "pago",
      qrCodePix,
      copiaColaPix,
    };

    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    console.error("Erro ao processar pedido:", error);
    return NextResponse.json(
      { erro: "Falha interna ao registrar pedido" },
      { status: 500 }
    );
  }
}
