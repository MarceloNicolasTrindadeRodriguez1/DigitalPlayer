# Use the official Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN yarn build

# Use a lightweight server to serve the built files
FROM nginx:alpine AS production

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy build files from the previous stage
COPY --from=build /app/build .

# Expose the port Nginx is serving on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]