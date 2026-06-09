FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend code and Prices.csv from context
COPY . .

EXPOSE 8000

CMD ["node", "server.js"]
