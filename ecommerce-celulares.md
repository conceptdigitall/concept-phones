# Plano de Tarefas · E-commerce de Celulares (Concept Phones)

> **Projeto:** Concept Phones (Smartphones Apple & Samsung)  
> **Status:** Planejamento aprovado  
> **Diretrizes:** Mobile-first, sem roxo (Purple Ban), teto de 350 linhas por arquivo.

---

## Fases de Execução

- [x] **Fase 1: Setup do Projeto & Estrutura Base**
  - Inicializar Next.js 15/16 App Router com TypeScript e Tailwind CSS
  - Configurar paleta de cores Navy/Royal Blue/Âmbar e tokens de design
  - Criar `src/lib/types.ts` com tipagem robusta (Smartphone, Variacao, Condicao, Bateria)
- [x] **Fase 2: Catálogo de Dados de iPhones e Samsung**
  - Modelos Apple: iPhone 16 Pro Max, 16, 15 Pro, 14, 13
  - Modelos Samsung: Galaxy S24 Ultra, S24, S23, Z Flip 6
  - Variações: Armazenamento, Cores, Novo vs Seminovo com % de bateria e garantia
- [x] **Fase 3: Layout & Home Page Mobile-First**
  - Header com busca e gatilho de carrinho
  - Bottom Navigation bar para telas mobile
  - Hero Banner de impacto com badges de garantia e confiança
  - Vitrine de produtos com filtros instantâneos por marca e condição
- [x] **Fase 4: Página do Produto & Seleção de Variações**
  - Galeria de fotos com alternância por cor
  - Seletor de armazenamento, condição (novo/seminovo) e bateria
  - Simulador de frete por CEP (ViaCEP) e cálculo de parcelas em até 12x
  - Botão de compra direta e CTA WhatsApp para dúvidas
- [x] **Fase 5: Carrinho & Checkout Transparente**
  - Zustand cart store com persistência local
  - Checkout em 3 etapas (Identificação, Entrega, Pagamento Mercado Pago Pix/Cartão)
  - Tela de confirmação do pedido com QR Code Pix dinâmico
- [x] **Fase 6: Testes, Lint & Validação**
  - Testes de regras de negócio (desconto Pix, cálculo de parcelas) com Vitest
  - Auditoria de 350 linhas por arquivo e responsividade mobile
  - Lint e build de produção 100% aprovados sem erros
