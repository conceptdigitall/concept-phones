"use client";

import Image from "next/image";
import { Smartphone, Camera, Cpu, Battery, HardDrive } from "lucide-react";

interface ModeloComparacao {
  id: string;
  nome: string;
  imagem: string;
  display: string;
  camera: string;
  processador: string;
  bateria: string;
  armazenamento: string;
}

const MODELOS_COMPARACAO: ModeloComparacao[] = [
  {
    id: "x1",
    nome: "Nexora X1",
    imagem: "/images/produtos/iphone-15-pro.jpg",
    display: '6.7" OLED Super Retina (120Hz)',
    camera: "48MP + 12MP + 12MP Periscópio",
    processador: "Apple A17 Pro (3nm)",
    bateria: "4.422 mAh (27W Turbo)",
    armazenamento: "128 / 256 / 512GB / 1TB",
  },
  {
    id: "x1-pro",
    nome: "Nexora X1 Pro",
    imagem: "/images/produtos/iphone-16-pro-max.jpg",
    display: '6.9" OLED Super Retina (120Hz)',
    camera: "48MP Fusion + 48MP Ultra + 12MP 5x",
    processador: "Apple A18 Pro com Neural Engine",
    bateria: "4.685 mAh (30W MagSafe)",
    armazenamento: "256 / 512GB / 1TB",
  },
  {
    id: "lite",
    nome: "Nexora Lite",
    imagem: "/images/produtos/galaxy-s24.jpg",
    display: '6.2" Dynamic AMOLED 2X (120Hz)',
    camera: "50MP + 12MP Ultra + 10MP Tele",
    processador: "Exynos 2400 Deca-Core",
    bateria: "4.000 mAh (25W)",
    armazenamento: "128 / 256GB",
  },
  {
    id: "ultra",
    nome: "Nexora Ultra",
    imagem: "/images/produtos/galaxy-s24-ultra.jpg",
    display: '6.8" Dynamic AMOLED 2X QHD+',
    camera: "200MP + 50MP 5x + 10MP 3x + 12MP",
    processador: "Snapdragon 8 Gen 3 for Galaxy",
    bateria: "5.000 mAh (45W Super Fast)",
    armazenamento: "256 / 512GB / 1TB",
  },
];

const LINHAS_SPECS = [
  { chave: "display", label: "Display", icone: Smartphone },
  { chave: "camera", label: "Câmeras", icone: Camera },
  { chave: "processador", label: "Processador", icone: Cpu },
  { chave: "bateria", label: "Bateria", icone: Battery },
  { chave: "armazenamento", label: "Armazenamento", icone: HardDrive },
];

export function SpecsComparison() {
  return (
    <section id="comparador" className="py-16 sm:py-20 bg-[#faf9f5] border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#787366] uppercase block mb-1">
            Ficha Técnica Comparativa
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0f1115]">
            Veja Como Eles Se Comparam
          </h2>
          <p className="text-xs sm:text-sm text-[#666c78] mt-2">
            Compare especificações de ponta a ponta e escolha o smartphone perfeito para a sua rotina.
          </p>
        </div>

        {/* Tabela de Comparação Limpa */}
        <div className="bg-white rounded-2xl border border-[#e4e0d4] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              {/* Header com miniaturas */}
              <thead>
                <tr className="border-b border-[#ece8de] bg-[#fbfbfa]">
                  <th className="p-4 w-44 text-xs font-bold text-[#454952] uppercase tracking-wider">
                    Recurso
                  </th>
                  {MODELOS_COMPARACAO.map((mod) => (
                    <th key={mod.id} className="p-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-14 mb-2">
                          <Image
                            src={mod.imagem}
                            alt={mod.nome}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xs font-bold text-[#0f1115]">
                          {mod.nome}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Corpo com as linhas de especificações */}
              <tbody className="divide-y divide-[#f0ede3] text-xs">
                {LINHAS_SPECS.map((linha, idx) => {
                  const Icone = linha.icone;
                  return (
                    <tr
                      key={linha.chave}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#fcfbf9]"}
                    >
                      <td className="p-4 font-semibold text-[#1a1d23] flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-[#f2efe6] flex items-center justify-center text-[#5c574c]">
                          <Icone className="w-3.5 h-3.5" />
                        </div>
                        <span>{linha.label}</span>
                      </td>

                      {MODELOS_COMPARACAO.map((mod) => (
                        <td
                          key={mod.id}
                          className="p-4 text-center text-[#4b515d] leading-relaxed"
                        >
                          {mod[linha.chave as keyof ModeloComparacao]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
