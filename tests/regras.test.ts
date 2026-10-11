import { test, expect } from "vitest";
import { formatarMoeda, calcularParcelas, formatarCep, formatarCpf } from "../src/lib/formatters";
import { calcularOpcoesFrete } from "../src/lib/frete";
import { PRODUTOS } from "../src/data/produtos";

test("formatarMoeda deve formatar valores em BRL", () => {
  const formatado = formatarMoeda(1999.9);
  expect(formatado).toContain("1.999,90");
  expect(formatado).toContain("R$");
});

test("calcularParcelas deve dividir corretamente em até 12x", () => {
  const resultado = calcularParcelas(1200, 12);
  expect(resultado.parcelas).toBe(12);
  expect(resultado.valorParcela).toBe(100);
  expect(resultado.total).toBe(1200);
});

test("formatarCep e formatarCpf devem aplicar máscaras corretas", () => {
  expect(formatarCep("11015000")).toBe("11015-000");
  expect(formatarCpf("12345678901")).toBe("123.456.789-01");
});

test("calcularOpcoesFrete deve conceder frete grátis acima de R$ 3.000", () => {
  const fretesComuns = calcularOpcoesFrete("11015000", 2500);
  const sedexComum = fretesComuns.find((f) => f.id === "sedex");
  expect(sedexComum?.valor).toBeGreaterThan(0);

  const fretesGratis = calcularOpcoesFrete("11015000", 3500);
  const sedexGratis = fretesGratis.find((f) => f.id === "sedex");
  expect(sedexGratis?.valor).toBe(0);
});

test("Catálogo de produtos deve conter variações válidas e coerentes", () => {
  expect(PRODUTOS.length).toBeGreaterThanOrEqual(8);

  for (const produto of PRODUTOS) {
    expect(produto.nome.length).toBeGreaterThan(0);
    expect(produto.slug.length).toBeGreaterThan(0);
    expect(produto.variacoes.length).toBeGreaterThan(0);

    for (const v of produto.variacoes) {
      expect(v.preco).toBeGreaterThan(0);
      expect(v.precoPix).toBeGreaterThan(0);
      expect(v.precoPix).toBeLessThanOrEqual(v.preco);
      expect(v.saudeBateria.length).toBeGreaterThan(0);
      expect(v.estoque).toBeGreaterThan(0);
    }
  }
});
