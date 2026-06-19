# 🍅 Ignite Timer - App Pomodoro

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-yellow?logo=vite)
![Styled Components](https://img.shields.io/badge/Styled%20Components-6.3-pink?logo=styled-components)
![ESLint](https://img.shields.io/badge/ESLint-9.39-yellow?logo=eslint)

Uma aplicação moderna de **Timer Pomodoro** desenvolvida com **React.js e TypeScript**, implementando a técnica Pomodoro para melhorar produtividade. A aplicação oferece uma interface intuitiva, persistência de dados com localStorage e histórico de ciclos de trabalho.

---

## ✨ Funcionalidades Principais

### 🎯 Página Home
- **Timer Configurável** – Crie ciclos de trabalho customizados (5-60 minutos)
- **Contador Regressivo** – Exibe o tempo restante em tempo real
- **Formato do Título** – O título da aba atualiza com o tempo restante (MM:SS)
- **Controles Interativos** – Botões para iniciar e interromper ciclos
- **Validação de Formulário** – Usa React Hook Form com Zod para validação

### 📊 Página History
- **Histórico Completo** – Lista de todos os ciclos criados
- **Status Visual** – Indicadores coloridos (🟢 Concluído, 🔴 Interrompido, 🟡 Em andamento)
- **Informações Detalhadas** – Tarefa, duração, data de início e status
- **Formatação de Data** – Exibe tempo relativo (ex: "há 2 minutos")

### 💾 Persistência de Dados
- **localStorage** – Todos os ciclos são salvos automaticamente
- **Sincronização em Tempo Real** – Dados persistem após refresh da página
- **Recuperação Automática** – Dados são restaurados ao abrir a aplicação

---

## 🏗️ Arquitetura e Estrutura do Projeto

```
src/
├── components/
│   └── Header/                    # Componente de navegação
│       ├── Header.tsx
│       └── style.ts
├── contexts/
│   └── CyclesContext.tsx          # Context global para gerenciar ciclos
├── layouts/
│   └── Default/
│       ├── index.tsx              # Layout padrão com header
│       └── style.ts
├── pages/
│   ├── Home/                      # Página principal do timer
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   └── components/
│   │       ├── Countdown/         # Componente do contador regressivo
│   │       │   ├── index.tsx
│   │       │   └── styled.ts
│   │       └── NewCycleForm/      # Formulário para criar ciclos
│   │           ├── index.tsx
│   │           └── styled.ts
│   └── History/                   # Página de histórico
│       ├── index.tsx
│       └── style.ts
├── reducers/
│   └── cycles/
│       ├── actions.ts             # Actions do reducer
│       └── reducer.ts             # Lógica do estado (ADD, INTERRUPT, FINISH)
├── styles/
│   ├── themes/
│   │   ├── default.ts             # Cores e tokens de design
│   │   └── global.ts              # Estilos globais
│   └── types/
│       └── styled.d.ts            # Tipagem do tema Styled Components
├── @types/
│   └── styled.d.ts                # Extensão de tipos para Styled Components
├── App.tsx                        # Componente raiz com providers
├── Router.tsx                     # Configuração de rotas
└── main.tsx                       # Ponto de entrada da aplicação
```

---

## 🔄 Fluxo de Estado (State Management)

A aplicação usa **useReducer** para gerenciar ciclos de forma eficiente:

```
CyclesContext (Provider)
├── cyclesState[] (Array de ciclos)
├── activeCycleId (ID do ciclo ativo)
├── amountSecondsPassed (Segundos decorridos)
└── Ações:
    ├── ADD_NEW_CYCLE → Cria novo ciclo
    ├── INTERRUPT_CURRENT_CYCLE → Marca como interrompido
    └── MARK_CURRENT_CYCLE_AS_FINISHED → Marca como concluído
```

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React** | 19.2 | Framework principal |
| **TypeScript** | 5.9 | Tipagem estática |
| **Vite** | 7.3 | Build tool e dev server |
| **Styled Components** | 6.3 | Estilização CSS-in-JS |
| **React Router DOM** | 7.13 | Navegação entre páginas |
| **React Hook Form** | 7.71 | Gerenciamento de formulários |
| **Zod** | (via @hookform/resolvers) | Validação de esquemas |
| **date-fns** | 4.1 | Formatação e manipulação de datas |
| **Phosphor Icons** | 2.1 | Ícones SVG |
| **Immer** | 11.1 | State updates imutáveis |
| **ESLint** | 9.39 | Linting e padrão de código |

---

## 🚀 Como Usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/app-pomodoro.git
cd app-pomodoro

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173/`

### Build para Produção

```bash
npm run build
```

Gera os arquivos otimizados em `dist/`

### Preview da Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 💡 Como Usar a Aplicação

### 1️⃣ Criar um Novo Ciclo

1. Na página **Home**, preencha o campo "Vou trabalhar em..."
2. Digite a duração em minutos (5-60 minutos)
3. Clique em **"Começar"**

### 2️⃣ Monitorar o Ciclo

- O timer iniciará contagem regressiva
- O título da aba exibe o tempo restante em tempo real
- O botão muda para **"Interromper"**

### 3️⃣ Finalizar o Ciclo

- Deixe o timer chegar a 0:00 para **completar** o ciclo automaticamente
- Ou clique em **"Interromper"** para parar a qualquer momento

### 4️⃣ Visualizar Histórico

- Navegue até a página **"History"**
- Veja todos os seus ciclos com status e duração
- Os ciclos mostram quando foram criados (ex: "há 2 minutos")

---

## 🎨 Design e UX

- **Interface Limpa** – Foco no essencial, sem distrações
- **Tema Dark** – Reduz cansaço visual durante sessões longas
- **Responsivo** – Funciona bem em desktop e mobile
- **Feedback Visual** – Cores indicam status dos ciclos
  - 🟢 Verde: Concluído
  - 🔴 Vermelho: Interrompido
  - 🟡 Amarelo: Em andamento

---

## 🔧 Bugs Corrigidos

✅ Payload inconsistente no reducer (cycleId vs activeCycleId)  
✅ Estado inicial incorreto (array vs objeto)  
✅ Colisão de nomes em CyclesContext  
✅ Referências de funções incorretas  
✅ Props não-transientes em styled-components  

---

## 📝 Padrões de Código

- **TypeScript** – Tipagem forte em toda a aplicação
- **Componentes Funcionais** – Uso exclusivo de Hooks
- **Context API** – Gerenciamento global de estado
- **useReducer** – Lógica de estado previsível
- **Custom Hooks** – Reutilização de lógica
- **Styled Components** – Componentes estilizados isolados

---

## 🎓 Aprendizados e Conceitos Praticados

Este projeto pratica conceitos importantes de React moderno:

✅ **Hooks** – useState, useContext, useEffect, useReducer  
✅ **Context API** – Compartilhamento de estado global  
✅ **React Router** – Navegação entre páginas  
✅ **Formulários** – React Hook Form + Zod  
✅ **Estilização** – Styled Components + Temas  
✅ **TypeScript** – Tipagem estática e interfaces  
✅ **localStorage** – Persistência de dados  
✅ **Manipulação de Datas** – date-fns para formatação  

---

## 📄 Licença

Este projeto é fornecido como está para fins educacionais.

---

## 👨‍💻 Desenvolvimento

Desenvolvido como projeto de aprendizado em React.js com TypeScript, Styled Components e boas práticas modernas de desenvolvimento frontend.

- Clique em **Iniciar** para começar o Pomodoro de foco.  
- O timer contará o tempo de trabalho definido.  
- Ao terminar, o timer notificará para iniciar o período de descanso.  
- Você pode **pausar** ou **reiniciar** o timer a qualquer momento.  
- Ajuste o tempo de foco e descanso através do formulário gerenciado pelo **React Hook Form**.

## 🧹 Contribuição

Projeto criado para fins **estudantis**, mas contribuições são bem-vindas!

Para contribuir:

1. Faça um fork do projeto  
2. Crie uma branch (`git checkout -b minha-feature`)  
3. Faça commit das alterações (`git commit -m 'Minha nova feature'`)  
4. Push para a branch (`git push origin minha-feature`)  
5. Abra um Pull Request

@Obrigado...
