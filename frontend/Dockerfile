# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ code và build
COPY . .

# (Nếu bạn dùng Turbopack, nó vẫn dùng 'next build' cho production)
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Sao chép các file cần thiết từ stage 'builder'
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

# Lệnh để chạy Next.js server production
CMD ["npm", "start"]