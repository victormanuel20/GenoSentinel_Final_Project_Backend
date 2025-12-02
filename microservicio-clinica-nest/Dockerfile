FROM node:20-alpine AS build
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install
RUN npm install -g typescript   # <-- instalar global

COPY . .
RUN tsc -p tsconfig.build.json  # <-- usar binario global

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]