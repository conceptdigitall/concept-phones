import { Produto, Marca, Condicao } from "../lib/types";
import { PRODUTOS_APPLE } from "./produtos-apple";
import { PRODUTOS_SAMSUNG } from "./produtos-samsung";

export const PRODUTOS: Produto[] = [...PRODUTOS_APPLE, ...PRODUTOS_SAMSUNG];

export function obterProdutoPorSlug(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug);
}

export function filtrarProdutos(filtros: {
  marca?: Marca;
  condicao?: Condicao;
  apenasDestaques?: boolean;
  apenasOfertas?: boolean;
}): Produto[] {
  return PRODUTOS.filter((p) => {
    if (filtros.marca && p.marca !== filtros.marca) return false;
    if (filtros.apenasDestaques && !p.emDestaque) return false;
    if (filtros.apenasOfertas && !p.ofertaRelampago) return false;
    if (filtros.condicao) {
      const temCondicao = p.variacoes.some((v) => v.condicao === filtros.condicao);
      if (!temCondicao) return false;
    }
    return true;
  });
}
