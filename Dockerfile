FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --production 2>&1 || npm install --production

# Copy all backend files
COPY backend/server.js ./
COPY backend/config ./config
COPY backend/utils ./utils
COPY backend/Prices.csv ./

# Test that files exist
RUN ls -la && echo "=== Config ===" && ls -la config/ && echo "=== Utils ===" && ls -la utils/

EXPOSE 8000

CMD ["node", "server.js"]
