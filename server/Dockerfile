FROM node:20-alpine

# Install dependencies required for building native modules (like better-sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the Strapi admin panel
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
