# syntax=docker/dockerfile:1

# Use Bun instead of Node
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Development stage
FROM base as development
ENV NODE_ENV development
# Download all dependencies including dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.bun \
    bun install
# Copy the source files
COPY . .
# Expose the port
EXPOSE 3000
# Run development command
CMD ["bun", "run", "dev"]

# Production stage
FROM base as production
ENV NODE_ENV production
# Download only production dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.bun \
    bun install --production
# Run as non-root user
USER bun
# Copy the source files
COPY . .
# Expose the port
EXPOSE 3000
# Run production command
CMD ["bun", "run", "prod"]