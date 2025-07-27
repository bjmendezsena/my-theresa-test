# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de configuración del proyecto
COPY package.json package-lock.json ./
COPY tsconfig.json vite.config.ts prettier.config.cjs ./

# Instalar todas las dependencias (dev + prod) con cache optimizado
RUN npm ci --prefer-offline --no-audit

# Copiar código fuente
COPY src ./src
COPY public ./public
COPY server.ts ./
COPY index.html ./

# Ejecutar el build completo
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS production

WORKDIR /app

# Crear usuario no root antes de cualquier operación
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copiar archivos de configuración como usuario root
COPY package.json package-lock.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev && npm cache clean --force

# Copiar los archivos compilados desde la etapa de build
COPY --from=build /app/dist ./dist

# Cambiar permisos solo de los archivos necesarios (no node_modules)
RUN chown -R nextjs:nodejs /app/dist /app/package*.json

# Cambiar a usuario no root
USER nextjs

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5173

EXPOSE 5173

# Health check simple que verifica que Node.js funciona
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "console.log('OK')" || exit 1

CMD ["npm", "start"]