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

# Copiar configuração personalizada do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
