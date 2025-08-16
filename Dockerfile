# Railway Deployment Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Build the application
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose port (Railway provides PORT env var)
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
