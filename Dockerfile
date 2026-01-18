
FROM oven/bun:latest AS builder
WORKDIR /app

# Install deps
# Copy lockfiles so Bun uses `bun.lock` instead of migrating from package-lock.json
COPY package.json package-lock.json bun.lock ./
RUN bun install

# Build
COPY . .
RUN bun run build

FROM oven/bun:latest AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built app and node_modules from builder (no install step needed)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "run", "start:prod-bun"]
