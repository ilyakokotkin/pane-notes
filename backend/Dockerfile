# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container 
COPY package*.json ./

# Install any needed packages 
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Make the app's port available to the outside world
EXPOSE 5000

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["node", "server.js"]
