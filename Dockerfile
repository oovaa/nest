FROM oven/bun:latest AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN bun install

# Build
COPY . .
RUN bun run build

FROM oven/bun:latest AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN bun install --production

# Copy build and modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "run", "start:prod-bun"]
