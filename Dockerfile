# ---------- Stage 1: compile the React/Vite frontend ----------
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first so they stay cached across source changes
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy the frontend sources and produce the static bundle
COPY frontend/ ./
RUN npm run build

# ---------- Stage 2: serve the static bundle with nginx ----------
FROM nginx:alpine

# Replace the bundled default site with the compiled app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ /usr/share/nginx/html/

# SPA routing config (fallback to index.html for client-side routes)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# nginx runs in the foreground
CMD ["nginx", "-g", "daemon off;"]
