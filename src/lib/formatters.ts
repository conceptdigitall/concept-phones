export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function calcularParcelas(
  valor: number,
  maxParcelas: number = 12
): { parcelas: number; valorParcela: number; total: number } {
  const parcelas = Math.max(1, maxParcelas);
  const valorParcela = valor / parcelas;
  return {
    parcelas,
    valorParcela,
    total: valor,
  };
}

export function formatarCep(valor: string): string {
  const apenasNumeros = valor.replace(/\D/g, "").slice(0, 8);
  if (apenasNumeros.length <= 5) return apenasNumeros;
  return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5)}`;
}

export function formatarCpf(valor: string): string {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length <= 3) return nums;
  if (nums.length <= 6) return `${nums.slice(0, 3)}.${nums.slice(3)}`;
  if (nums.length <= 9)
    return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}`;
  return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6, 9)}-${nums.slice(9)}`;
}

export function formatarTelefone(valor: string): string {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length <= 2) return nums;
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
}

export function gerarLinkWhatsApp(
  produtoNome: string,
  armazenamento?: string,
  cor?: string
): string {
  const numero = "5513999999999"; // Configurável
  const detalhes = [produtoNome, armazenamento, cor].filter(Boolean).join(" ");
  const texto = encodeURIComponent(
    `Olá! Estava navegando no site da Concept Phones e tenho interesse no *${detalhes}*. O aparelho ainda está disponível?`
  );
  return `https://wa.me/${numero}?text=${texto}`;
}
