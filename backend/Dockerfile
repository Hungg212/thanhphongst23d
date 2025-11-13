# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

# --- THÊM DÒNG NÀY ĐỂ CÀI CURL (CHO HEALTHCHECK) ---
RUN apk add --no-cache curl
# --- HẾT THÊM ---

RUN npm install -g sequelize-cli

EXPOSE 5000
CMD ["node", "server.js"]