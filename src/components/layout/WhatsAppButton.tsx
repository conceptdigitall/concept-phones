"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const numero = "5513999999999";
  const mensagem = encodeURIComponent(
    "Olá! Estou navegando na loja Concept Phones e gostaria de tirar uma dúvida sobre os smartphones disponíveis."
  );

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-30"
    >
      <a
        href={`https://wa.me/${numero}?text=${mensagem}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-full shadow-lg shadow-emerald-600/30 transition-transform hover:scale-105 active:scale-95 text-xs sm:text-sm"
        aria-label="Falar com especialista no WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline">Tirar Dúvidas</span>
      </a>
    </aside>
  );
}
