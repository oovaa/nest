
FROM oven/bun:latest
WORKDIR /app

# Development image: install all deps and run Nest in watch mode
ENV NODE_ENV=development

# Copy lockfiles first for deterministic install
COPY package.json package-lock.json bun.lock ./
RUN bun install

# Copy source
COPY . .

EXPOSE 3000
CMD ["bun", "run", "start:dev"]
