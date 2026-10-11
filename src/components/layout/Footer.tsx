import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, Smartphone, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white pt-12 pb-24 md:pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-navy-800">
          {/* Coluna 1: Marca & Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-royal-600 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-gold-400" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Concept<span className="text-royal-500">Phones</span>
              </span>
            </div>
            <p className="text-xs text-ink-400 leading-relaxed">
              Especialistas em smartphones premium Apple e Samsung. Aparelhos novos lacrados com garantia oficial e seminovos rigorosamente revisados com laudo de bateria.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-gold-400 bg-navy-900 border border-gold-500/20 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Compra 100% Protegida
              </span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-sm font-semibold text-ink-100 uppercase tracking-wider mb-4">
              Categorias
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-400">
              <li>
                <Link href="/#apple" className="hover:text-white transition">
                  iPhones Novos Lacrados
                </Link>
              </li>
              <li>
                <Link href="/#samsung" className="hover:text-white transition">
                  Samsung Galaxy Linha S & Z
                </Link>
              </li>
              <li>
                <Link href="/#seminovos" className="hover:text-white transition">
                  Seminovos com Saúde da Bateria
                </Link>
              </li>
              <li>
                <Link href="/#ofertas" className="hover:text-white transition">
                  Ofertas Relâmpago Pix
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Garantia & Segurança */}
          <div>
            <h4 className="text-sm font-semibold text-ink-100 uppercase tracking-wider mb-4">
              Compromisso
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-400">
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-royal-500" />
                <span>Envio rápido com rastreio total</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-gold-400" />
                <span>7 dias para troca ou devolução CDC</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-royal-500" />
                <span>Mercado Pago: Pix e até 12x no cartão</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Atendimento & Horário */}
          <div>
            <h4 className="text-sm font-semibold text-ink-100 uppercase tracking-wider mb-4">
              Atendimento
            </h4>
            <div className="space-y-2 text-xs text-ink-400">
              <p>Segunda a Sábado das 09h às 19h</p>
              <p className="text-ink-200 font-medium">WhatsApp: (13) 99999-9999</p>
              <p>E-mail: contato@conceptphones.com.br</p>
              <p className="pt-2 text-[11px] text-ink-500">
                Atendimento consultivo para escolha do seu aparelho ideal.
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-ink-500">
          <p>© {new Date().getFullYear()} Concept Phones. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Privacidade e Segurança</span>
            <span>Termos de Garantia</span>
            <span>Feito com Concept Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
