# Etapa 1: Producción
FROM node:20-alpine AS production

WORKDIR /app

# Copiar archivos necesarios desde el contexto (suponiendo que ya vienen del CI)
COPY dist ./dist
COPY server.ts ./
COPY package.json ./
COPY package-lock.json ./

ENV NODE_ENV=production

# Instalar solo dependencias de producción
RUN npm install --omit=dev

EXPOSE 5173

CMD ["npm", "start"]
