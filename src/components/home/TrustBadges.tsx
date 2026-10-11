import { ShieldCheck, Battery, Truck, Clock } from "lucide-react";

export function TrustBadges() {
  const pilares = [
    {
      icone: ShieldCheck,
      titulo: "100% Originais & Testados",
      descricao: "Checklist de 30+ itens técnicos com laudo de procedência",
      cor: "text-royal-600",
    },
    {
      icone: Battery,
      titulo: "Bateria Original com Laudo",
      descricao: "Aparelhos seminovos com saúde entre 88% e 98% sem trocas",
      cor: "text-emerald-600",
    },
    {
      icone: Truck,
      titulo: "Envio Rápido com Seguro",
      descricao: "Postagem com seguro contra roubo e extravio em todo Brasil",
      cor: "text-gold-600",
    },
    {
      icone: Clock,
      titulo: "Garantia de até 1 Ano",
      descricao: "1 ano oficial em novos e 90 dias em seminovos com nossa oficina",
      cor: "text-navy-900",
    },
  ];

  return (
    <section className="bg-white border-b border-ink-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {pilares.map((p, idx) => {
            const Icone = p.icone;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-ink-50/60 border border-ink-100"
              >
                <div className={`p-2.5 rounded-lg bg-white shadow-xs shrink-0 ${p.cor}`}>
                  <Icone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-navy-950 leading-tight">
                    {p.titulo}
                  </h4>
                  <p className="text-[11px] text-ink-500 leading-tight">
                    {p.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
