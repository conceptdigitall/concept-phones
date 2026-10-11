export type Marca = "apple" | "samsung";

export type Condicao = "novo" | "seminovo";

export type Armazenamento = "128GB" | "256GB" | "512GB" | "1TB";

export interface Cor {
  nome: string;
  hex: string;
}

export interface Variacao {
  id: string;
  armazenamento: Armazenamento;
  cor: Cor;
  condicao: Condicao;
  saudeBateria: string;
  preco: number;
  precoPix: number;
  precoCheio: number;
  estoque: number;
  imagem: string;
}

export interface EspecificacoesProduto {
  tela: string;
  processador: string;
  cameraPrincipal: string;
  cameraFrontal: string;
  conectividade: string;
  resistencia: string;
  garantia: string;
}

export interface Produto {
  id: string;
  nome: string;
  slug: string;
  marca: Marca;
  categoria: "iphone" | "galaxy";
  badge?: string;
  resumo: string;
  descricao: string;
  destaques: string[];
  especificacoes: EspecificacoesProduto;
  variacoes: Variacao[];
  imagens: string[];
  emDestaque?: boolean;
  maisVendido?: boolean;
  ofertaRelampago?: boolean;
}

export interface ItemCarrinho {
  variacaoId: string;
  produtoId: string;
  produtoNome: string;
  produtoSlug: string;
  marca: Marca;
  cor: Cor;
  armazenamento: Armazenamento;
  condicao: Condicao;
  saudeBateria: string;
  precoUnitario: number;
  precoPixUnitario: number;
  quantidade: number;
  imagem: string;
}

export interface DadosEntrega {
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  metodoEnvio: "retirada" | "expresso" | "sedex";
  valorFrete: number;
  prazoDias: number;
}

export type MetodoPagamento = "pix" | "cartao";

export interface Pedido {
  id: string;
  codigo: string;
  criadoEm: string;
  itens: ItemCarrinho[];
  entrega: DadosEntrega;
  subtotal: number;
  frete: number;
  descontoPix: number;
  total: number;
  metodoPagamento: MetodoPagamento;
  status: "pendente" | "pago" | "em_separacao" | "enviado";
  qrCodePix?: string;
  copiaColaPix?: string;
}
