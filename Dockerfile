FROM node:18-alpine
WORKDIR /blogs

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# ✅ Ensure public/uploads folder exists inside the container
RUN mkdir -p /blogs/public/uploads

# Expose Next.js port
EXPOSE 6001

# Build and run at container startup
CMD ["sh", "-c", "npm run build && npm run start -- -H 0.0.0.0 -p 6001"]
