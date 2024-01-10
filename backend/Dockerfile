# Use an official Node.js runtime as the parent image
FROM node:16-alpine

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json, package-lock.json (if available), and the compiled JavaScript code
COPY package*.json ./
COPY dist/ ./dist/

# If you're using TypeScript's `tsc` to compile, copy the compiled JS files and any other necessary files like views, assets etc.
# COPY . .

# Install production dependencies.
RUN npm install --only=production

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run the app using CMD
CMD ["node", "dist/index.js"]
