# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# (Nếu bạn dùng TypeScript, bước build sẽ ở đây)

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

# Cài đặt sequelize-cli toàn cục để chạy migration
RUN npm install -g sequelize-cli

EXPOSE 5000
CMD ["node", "server.js"]