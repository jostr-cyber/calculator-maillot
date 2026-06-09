# Backend service built from monorepo root
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY backend/config ./config
COPY backend/utils ./utils
COPY backend/server.js ./

# Copy Prices.csv (try root first, fallback to backend)
COPY Prices.csv ./Prices.csv

EXPOSE 8000

CMD ["node", "server.js"]
