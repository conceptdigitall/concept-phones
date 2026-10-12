import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#090b0e] text-white pt-12 pb-24 md:pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/80">
          {/* Coluna 1: Marca & Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                Nexora<span className="text-[#8e8a7d] font-normal text-xs ml-1 tracking-widest uppercase">Phones</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Smartphones flagship Apple e Samsung com padrão internacional de inspeção técnica. Novos lacrados e seminovos com laudo de bateria e garantia de até 1 ano.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900 border border-neutral-700/60 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Compra 100% Protegida
              </span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/#lineup" className="hover:text-white transition">
                  Linha de Flagships
                </Link>
              </li>
              <li>
                <Link href="/#comparador" className="hover:text-white transition">
                  Tabela Comparativa de Specs
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="hover:text-white transition">
                  Showcase de Câmera & Chips
                </Link>
              </li>
              <li>
                <Link href="/#acessorios" className="hover:text-white transition">
                  Acessórios Originais
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Garantia & Segurança */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Compromisso
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-neutral-300" />
                <span>Envio expresso com seguro total</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-neutral-300" />
                <span>7 dias para troca ou devolução</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-neutral-300" />
                <span>Pix 10% OFF ou até 12x no cartão</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Atendimento & Horário */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Atendimento
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>Segunda a Sábado das 09h às 19h</p>
              <p className="text-white font-medium">WhatsApp: (13) 99999-9999</p>
              <p>E-mail: contato@nexoraphones.com.br</p>
              <p className="pt-2 text-[11px] text-neutral-500">
                Atendimento consultivo e suporte pós-venda dedicado.
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Nexora Phones · Concept Digital. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Privacidade e Segurança</span>
            <span>Termos de Garantia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
