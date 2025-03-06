# Usar uma imagem Node oficial como base
FROM node:20-alpine AS build

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de configuração do projeto
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm install

# Copiar o resto dos arquivos do projeto
COPY . .

# Construir o projeto
RUN npm run build

# Usar Nginx para servir a aplicação
FROM nginx:alpine

# Copiar os arquivos construídos do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Criar diretórios para sites-available e sites-enabled
RUN mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

# Copiar configuração personalizada do Nginx para sites-available
COPY nginx.conf /etc/nginx/sites-available/meu_projeto

# Criar link simbólico para habilitar o site
RUN ln -s /etc/nginx/sites-available/meu_projeto /etc/nginx/sites-enabled/

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
