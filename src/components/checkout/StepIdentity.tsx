"use client";

import { User, Mail, Phone, FileText } from "lucide-react";
import { formatarCpf, formatarTelefone } from "@/lib/formatters";

interface StepIdentityProps {
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
  onChange: (campo: string, valor: string) => void;
  onAvancar: () => void;
}

export function StepIdentity({
  nome,
  email,
  whatsapp,
  cpf,
  onChange,
  onAvancar,
}: StepIdentityProps) {
  const isValido =
    nome.trim().length >= 3 &&
    email.includes("@") &&
    whatsapp.replace(/\D/g, "").length >= 10 &&
    cpf.replace(/\D/g, "").length === 11;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValido) onAvancar();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-ink-200 p-6 space-y-5 shadow-xs">
      <div className="border-b border-ink-100 pb-3">
        <h3 className="font-bold text-navy-950 text-base">1. Seus Dados Pessoais</h3>
        <p className="text-xs text-ink-500">
          Utilizados para emissão de nota fiscal, termo de garantia e envio do código de rastreio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nome */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            Nome Completo
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Ex: João Silva"
              value={nome}
              onChange={(e) => onChange("nome", e.target.value)}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 pl-10 pr-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
            />
            <User className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* E-mail */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            E-mail para Receber o Pedido
          </label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 pl-10 pr-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
            />
            <Mail className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            WhatsApp para Notificações
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="(11) 99999-9999"
              value={whatsapp}
              onChange={(e) => onChange("whatsapp", formatarTelefone(e.target.value))}
              maxLength={15}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 pl-10 pr-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
            />
            <Phone className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* CPF */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
            CPF (Obrigatório para emissão de NF e Garantia)
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => onChange("cpf", formatarCpf(e.target.value))}
              maxLength={14}
              className="w-full bg-ink-50/60 border border-ink-200 rounded-xl py-2.5 pl-10 pr-3 text-xs text-navy-950 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-600"
            />
            <FileText className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="pt-3">
        <button
          type="submit"
          disabled={!isValido}
          className="w-full bg-navy-950 hover:bg-royal-700 text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-40 disabled:pointer-events-none text-xs sm:text-sm"
        >
          Continuar para o Endereço de Entrega
        </button>
      </div>
    </form>
  );
}
