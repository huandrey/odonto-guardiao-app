# Odonto Guardião App

Odonto Guardião App é um projeto desenvolvido como parte do meu TCC (Trabalho de Conclusão de Curso). O objetivo deste projeto é melhorar a gestão de consultas odontológicas e a comunicação entre pacientes e clínicas. A aplicação oferece uma interface intuitiva e de fácil utilização tanto para pacientes quanto para administradores, facilitando o agendamento e o gerenciamento das clínicas.

## Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript, HTML5, CSS3
- **Build Tool:** Vite
- **Roteamento:** React Router DOM
- **Formulários:** React Hook Form
- **UI/UX:** Lucide React (ícones), Framer Motion (animações)
- **HTTP Client:** Axios
- **Geração de PDF:** jsPDF
- **PWA:** Vite PWA Plugin
- **Linting:** ESLint, TypeScript ESLint
- **Containerização:** Docker
- **Servidor Web:** Nginx (produção)

## Como Executar

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/huandrey/odonto-guardiao-app.git
   cd odonto-guardiao-app
   ```

2. **Instale as Dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   - Crie um arquivo `.env` baseado no arquivo `.env-example` e configure as variáveis conforme necessário:
   ```bash
   cp .env-example .env
   ```
   - Edite o arquivo `.env` e defina a URL do backend:
   ```
   VITE_BACKEND_URL=http://localhost:3001
   ```

4. **Execute a Aplicação em Modo de Desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Para Build de Produção:**
   ```bash
   npm run build
   ```

6. **Para Visualizar o Build de Produção:**
   ```bash
   npm run preview
   ```

7. **Acesse a Aplicação:**
   - Desenvolvimento: Abra seu navegador e acesse `http://localhost:5173`
   - Preview de produção: Abra seu navegador e acesse `http://localhost:4173`

## Executando com Docker

1. **Build da Imagem:**
   ```bash
   docker build -t odonto-guardiao-app .
   ```

2. **Execute o Container:**
   ```bash
   docker run -p 80:80 odonto-guardiao-app
   ```

3. **Acesse a Aplicação:**
   - Abra seu navegador e acesse `http://localhost`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run preview` - Visualiza o build de produção localmente
- `npm run lint` - Executa o linter para verificar qualidade do código
- `npm run generate-pwa-assets` - Gera assets para PWA

## Informações Adicionais

- Este projeto faz parte do meu TCC e representa um importante passo para a solução de gestão em serviços odontológicos.
- A aplicação é uma Progressive Web App (PWA), podendo ser instalada em dispositivos móveis.
- O projeto é uma colaboração entre a UFCG e a UEPB, unindo expertise acadêmica e tecnológica para um propósito social crucial.
- Contribuições, sugestões e feedback são bem-vindos para aprimorar a aplicação.

Aproveite para explorar o Odonto Guardião App!
