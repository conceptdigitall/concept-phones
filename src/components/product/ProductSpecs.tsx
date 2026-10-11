import { EspecificacoesProduto } from "@/lib/types";
import { Cpu, Camera, Smartphone, Wifi, Shield, Award } from "lucide-react";

interface ProductSpecsProps {
  especificacoes: EspecificacoesProduto;
  destaques: string[];
}

export function ProductSpecs({ especificacoes, destaques }: ProductSpecsProps) {
  const itens = [
    { icone: Smartphone, label: "Tela e Display", valor: especificacoes.tela },
    { icone: Cpu, label: "Processador", valor: especificacoes.processador },
    { icone: Camera, label: "Câmera Principal", valor: especificacoes.cameraPrincipal },
    { icone: Camera, label: "Câmera Frontal", valor: especificacoes.cameraFrontal },
    { icone: Wifi, label: "Conectividade", valor: especificacoes.conectividade },
    { icone: Shield, label: "Resistência", valor: especificacoes.resistencia },
    { icone: Award, label: "Garantia", valor: especificacoes.garantia },
  ];

  return (
    <div className="space-y-6 pt-8 border-t border-ink-200">
      {/* Destaques Principais */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
          Principais Vantagens deste Modelo
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {destaques.map((destaque, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-ink-50 border border-ink-200/60 text-xs text-navy-950 font-medium"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-royal-600 shrink-0" />
              <span>{destaque}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ficha Técnica */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
          Ficha Técnica Completa
        </h3>
        <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden divide-y divide-ink-100">
          {itens.map((item, idx) => {
            const Icone = item.icone;
            return (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs gap-1 sm:gap-4 hover:bg-ink-50/50 transition"
              >
                <div className="flex items-center gap-2 text-ink-500 font-medium">
                  <Icone className="w-4 h-4 text-royal-600 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <div className="sm:col-span-2 text-navy-950 font-semibold">
                  {item.valor}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
