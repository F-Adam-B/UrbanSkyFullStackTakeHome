# Step 1: Node base image
FROM node:16-alpine AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --silent

# Step 4: Copy source code
COPY . .

# Step 5: Build the application
RUN npm run build

# Stage 2 - Serve the React Application from Nginx
FROM nginx:stable-alpine as production
COPY --from=build /app/build /usr/share/nginx/html

# Replace the default Nginx configuration file with our custom one (if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker host, so we can access it 
# from the outside.
EXPOSE 80

# The final command to run when the container starts,
# which in this case is starting Nginx.
CMD ["nginx", "-g", "daemon off;"]
