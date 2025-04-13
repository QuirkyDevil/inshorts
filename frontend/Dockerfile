FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and lock files
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy all frontend files
COPY frontend ./

# Build the app
RUN pnpm build

# Serve with nginx
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
