# Build step
FROM node:22.14.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Copy correct env file before build
ARG ENV_FILE=dev
COPY env/.env.${ENV_FILE} .env

RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# End of Dockerfile
