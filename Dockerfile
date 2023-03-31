# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies from the package.json file
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application when the container starts
CMD [ "npm", "start" ]