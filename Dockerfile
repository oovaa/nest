FROM oven/bun:latest

WORKDIR /app

# Set to production for the final image
ENV NODE_ENV=production

# Copy dependency files first to leverage Docker caching
COPY package.json package-lock.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 3000

# Start the server
CMD ["bun", "run", "start"]