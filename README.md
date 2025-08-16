# OdontoGuardião

> O app foi desenvolvido para ajudar cirurgiões-dentistas na identificação e submissão de denúncias no combate à violência contra crianças e adolescentes.

A plataforma OdontoGuardião é uma ferramenta dedicada aos profissionais da Odontologia para identificar e reportar casos suspeitos de violência infantojuvenil. Como profissional da área, você tem um papel fundamental na proteção de crianças e adolescentes vulneráveis.

## 📋 Funcionalidades

- **Denúncia anônima**: Sistema seguro para reportar casos suspeitos
- **Documentos norteadores**: Acesso a materiais de apoio e orientação
- **Pontos de apoio**: Informações sobre organizações e contatos úteis
- **Interface responsiva**: Funciona em dispositivos móveis e desktop
- **Progressive Web App**: Pode ser instalado como aplicativo no dispositivo

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento rápido
- **React Router DOM** - Roteamento para aplicações React
- **Framer Motion** - Biblioteca de animações para React
- **Lucide React** - Ícones SVG como componentes React

### Formulários e Validação
- **React Hook Form** - Biblioteca para gerenciamento de formulários

### HTTP e Dados
- **Axios** - Cliente HTTP para requisições à API
- **LowDB** - Banco de dados JSON leve para armazenamento local

### PWA e Service Worker
- **Vite PWA Plugin** - Plugin para funcionalidades de PWA
- **Workbox** - Biblioteca para service workers

### PDF e Relatórios
- **jsPDF** - Geração de documentos PDF
- **jsPDF AutoTable** - Plugin para criação de tabelas em PDF

### Desenvolvimento
- **ESLint** - Linter para identificação de problemas no código
- **TypeScript ESLint** - Regras ESLint específicas para TypeScript

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**

## 🛠️ Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/huandrey/odonto-guardiao-app.git
cd odonto-guardiao-app
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env-example` para `.env` e configure as variáveis necessárias:
```bash
cp .env-example .env
```

Edite o arquivo `.env` e configure:
```bash
VITE_BACKEND_URL=http://localhost:3001
```

### 4. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

### 5. Build para produção
```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

### 6. Preview da versão de produção
```bash
npm run preview
# ou
yarn preview
# ou
pnpm preview
```

## 🐳 Docker

O projeto inclui configuração Docker para facilitar o deployment:

### Build da imagem
```bash
docker build -t odonto-guardiao-app .
```

### Executar container
```bash
docker run -p 80:80 odonto-guardiao-app
```

## 🏗️ Estrutura do Projeto

```
src/
├── features/           # Funcionalidades da aplicação
│   ├── denuncia/      # Sistema de denúncias
│   ├── inicio/        # Página inicial
│   ├── login/         # Autenticação
│   ├── registro/      # Cadastro de usuários
│   ├── sobre/         # Informações sobre o projeto
│   └── ...
├── shared/            # Componentes e utilitários compartilhados
│   ├── components/    # Componentes reutilizáveis
│   ├── hooks/         # Custom hooks
│   └── utils/         # Funções utilitárias
├── assets/            # Recursos estáticos
├── App.tsx           # Componente principal
└── main.tsx          # Ponto de entrada da aplicação
```

## 🧪 Ambiente de Desenvolvimento

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter ESLint
- `npm run generate-pwa-assets` - Gera assets para PWA

### Configuração do ESLint

O projeto usa ESLint com configurações para React e TypeScript. Para configurar regras mais rigorosas:

1. Configure o `parserOptions` no arquivo `eslint.config.js`:
```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. Substitua por configurações mais rigorosas:
```js
extends: [
  js.configs.recommended, 
  ...tseslint.configs.recommendedTypeChecked
],
```

### PWA (Progressive Web App)

A aplicação é configurada como PWA com:
- Cache offline
- Instalação em dispositivos
- Service worker automático
- Manifesto web

## 🤝 Contribuindo

Agradecemos contribuições para melhorar o OdontoGuardião! Siga estas diretrizes:

### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
git clone https://github.com/SEU_USUARIO/odonto-guardiao-app.git
cd odonto-guardiao-app
```

### 2. Crie uma branch para sua feature
```bash
git checkout -b feature/minha-nova-feature
```

### 3. Faça suas alterações
- Siga os padrões de código existentes
- Adicione testes se necessário
- Mantenha commits pequenos e descritivos

### 4. Teste suas alterações
```bash
npm run lint     # Verifica qualidade do código
npm run build    # Testa se o build funciona
```

### 5. Commit e Push
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/minha-nova-feature
```

### 6. Abra um Pull Request
- Descreva claramente suas alterações
- Inclua screenshots se houver mudanças visuais
- Referencie issues relacionadas

### Padrões de Commit
Seguimos a convenção de commits semânticos:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação (sem mudança de código)
- `refactor:` refatoração de código
- `test:` adição ou modificação de testes
- `chore:` tarefas de manutenção

### Diretrizes de Código
- Use TypeScript para tipagem
- Componentes funcionais com hooks
- Nomenclatura em português para features específicas da aplicação
- Nomenclatura em inglês para componentes reutilizáveis
- Mantenha componentes pequenos e focados

## 📄 Licença

Este projeto está sob uma licença de uso acadêmico. Entre em contato com os mantenedores para informações sobre uso comercial.

## 👥 Autores

- **Huandrey de Souza Pontes** - Desenvolvedor principal

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos canais oficiais do projeto ou abra uma issue no repositório.

---

**Importante**: Este projeto tem como objetivo combater a violência contra crianças e adolescentes. Todas as denúncias são tratadas com total seriedade e confidencialidade.
