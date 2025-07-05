# Use the official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose the backend port (change if needed)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
