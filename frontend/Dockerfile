# Build Stage
FROM node:22 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Run Next.js server
EXPOSE 3000
CMD ["npm", "run", "start"]
