FROM node:18-alpine

WORKDIR /app

# Copy and install dependencies first (for better caching)
COPY backend/package.json ./package.json
COPY backend/package-lock.json ./package-lock.json
RUN npm install --production

# Copy application code
COPY backend/server.js ./
COPY backend/config/ ./config/
COPY backend/utils/ ./utils/
COPY backend/Prices.csv ./Prices.csv

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 8000

# Start application
CMD ["node", "server.js"]
