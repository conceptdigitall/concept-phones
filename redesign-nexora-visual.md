# Plano de Tarefas · Redesign Visual Concept Phones (Estilo Nexora)

> **Projeto:** Concept Phones (`Projetos/Concept Phones`)  
> **Referência:** Imagem Nexora (Tech minimalista, fundo mineral off-white, tipografia forte, chips interativos)  
> **Diretrizes:** Mobile-first, Purple Ban (sem roxo), limite de 350 linhas por arquivo, componentes modulares.

---

## Fases de Execução

- [x] **Fase 1: Design Tokens & Paleta Mineral**
  - Atualizar `src/app/globals.css` com a nova paleta: fundo off-white/sand (`#fbfbfa`, `#f5f4f0`), superfícies minerais, bordas refinadas e acentos chumbo/preto ônix.
  - Ajustar estilos base para tipografia limpa, sombras sutis e badges pill.

- [x] **Fase 2: Header & Navegação Minimalista**
  - Refatorar `src/components/layout/Header.tsx` no formato minimalista (links clean, search pill arredondado, carrinho e CTA rápido).
  - Garantir compatibilidade com o BottomNav no mobile e carrinho existente.

- [x] **Fase 3: Hero Section Interativo (Estilo Nexora X1)**
  - Construir `src/components/home/HeroBanner.tsx` com:
    - Eyebrow em caixa alta (`THE NEXT GENERATION` / `NOVA GERAÇÃO`)
    - Título marcante e descrição clean
    - Seletor interativo de armazenamento (`128GB`, `256GB`, `512GB`, `1TB`) com cálculo dinâmico de preço e desconto Pix
    - Botões de CTA pill (`Comprar Agora` + `Ver Recursos`)
    - Render de destaque central com pedestal mineral e iluminação ambiente
    - Coluna lateral de especificações com ícones técnicos (Câmera AI, Display AMOLED/OLED, Processador Flagship, Bateria).

- [x] **Fase 4: Vitrine Lineup & Comparador de Especificações**
  - Criar `src/components/home/LineupSection.tsx` com os 4 modelos em destaque (iPhone 16 Pro Max, Galaxy S24 Ultra, Galaxy S24, iPhone 15 Pro) em cards brancos minimalistas.
  - Criar `src/components/home/SpecsComparison.tsx` com a tabela comparativa interativa lado a lado (Tela, Câmera, Processador, Bateria, Armazenamento).

- [x] **Fase 5: Showcases de Tecnologia, Acessórios & Prova Social**
  - Criar `src/components/home/ShowcaseBanners.tsx` com blocos imersivos de Câmera de Alta Resolução e Performance Extrema.
  - Criar `src/components/home/AccessoriesSection.tsx` (Fones sem fio, Capas protetoras, Carregadores rápidos, Películas).
  - Criar `src/components/home/CustomerReviews.tsx` com notas de 5 estrelas e depoimentos verificados.
  - Criar `src/components/home/BottomCtaBanner.tsx` com a barra escura de upgrade e selos de envio, segurança e garantia.

- [x] **Fase 6: Integração na HomePage, Build & Verificação**
  - Montar `src/app/page.tsx` conectando todos os novos componentes de forma modular e performática.
  - Rodar typecheck (`npm run build` ou `npx tsc --noEmit`), Vitest e ESLint.
  - Validar responsividade mobile e teto de 350 linhas por arquivo.
