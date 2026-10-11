export interface OpcaoFrete {
  id: "retirada" | "expresso" | "sedex";
  nome: string;
  descricao: string;
  valor: number;
  prazoDias: number;
}

export async function consultarViaCep(cep: string): Promise<{
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
} | null> {
  const limpo = cep.replace(/\D/g, "");
  if (limpo.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.erro) return null;

    return {
      logradouro: data.logradouro || "",
      bairro: data.bairro || "",
      localidade: data.localidade || "",
      uf: data.uf || "",
    };
  } catch {
    return null;
  }
}

export function calcularOpcoesFrete(
  _cep: string,
  subtotal: number
): OpcaoFrete[] {
  const freteGratis = subtotal >= 3000;

  return [
    {
      id: "retirada",
      nome: "Retirada na Loja",
      descricao: "Disponível em até 2 horas após aprovação",
      valor: 0,
      prazoDias: 0,
    },
    {
      id: "expresso",
      nome: "Entrega Expressa Segura",
      descricao: "Envio com seguro total e rastreio em tempo real",
      valor: freteGratis ? 0 : 29.9,
      prazoDias: 1,
    },
    {
      id: "sedex",
      nome: "Sedex com Seguro Total",
      descricao: "Entrega em todo o Brasil com termo de garantia",
      valor: freteGratis ? 0 : 45.0,
      prazoDias: 3,
    },
  ];
}
