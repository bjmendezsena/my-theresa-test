# Etapa 1: Producción
FROM node:20-alpine AS production

WORKDIR /app

COPY dist ./dist
COPY package.json ./
COPY package-lock.json ./

ENV NODE_ENV=production

# Instalar solo dependencias de producción
RUN npm install --omit=dev

EXPOSE 5173

CMD ["npm","start"]
