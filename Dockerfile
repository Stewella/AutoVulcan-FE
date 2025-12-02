# Multi-stage Dockerfile for Vite + Vue 3 project
# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# install build deps
COPY package.json package-lock.json* ./
COPY yarn.lock* ./
RUN npm ci --prefer-offline --no-audit --no-fund || npm install

# copy source and build
COPY . .
RUN npm run build

# Production stage - nginx serving static files
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# remove default nginx config and add a simple one that serves single page app
RUN rm /etc/nginx/conf.d/default.conf || true
COPY nginx.conf /etc/nginx/conf.d/app.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
