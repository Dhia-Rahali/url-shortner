# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose port and start the app
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
