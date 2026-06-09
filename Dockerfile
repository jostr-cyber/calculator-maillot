FROM node:18-alpine

WORKDIR /app

# Copy all backend files
COPY backend/package.json ./
COPY backend/package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy backend application files
COPY backend/server.js ./
COPY backend/config ./config
COPY backend/utils ./utils
COPY backend/Prices.csv ./

EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
