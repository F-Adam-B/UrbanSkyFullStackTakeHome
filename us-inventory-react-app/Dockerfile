# Step 1: Node base image
FROM node:16-alpine as build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy source code
COPY . .

# Step 5: Build the application
RUN npm run build

# Stage 2 - Serve the React Application from Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Forward incoming requests to port 80 to the server
EXPOSE 80

# Starting command
CMD ["nginx", "-g", "daemon off;"]
