# Use an official Node runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from your local directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of your frontend's directory into the container
COPY . ./

# Build the React application
RUN npm run build

# Start a new stage from scratch to build a clean, final image
FROM nginx:alpine

# Copy the build directory from the build stage to the Nginx serve directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
