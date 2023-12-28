# Use an official Node runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm config set unsafe-perm true
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Build the React application
RUN npm run build || cat /root/.npm/_logs/*-debug.log

# Use Nginx to serve the React application
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
