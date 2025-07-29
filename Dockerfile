FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL

ARG VITE_API_KEY

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV VITE_API_URL=$VITE_API_URL

ENV VITE_API_KEY=$VITE_API_KEY

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

COPY server.ts ./

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app
USER nextjs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

CMD ["npm", "start"]