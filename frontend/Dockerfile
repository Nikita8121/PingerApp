# Base image
FROM node

# Make folder to put our files in
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend
# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app/frontend
# Copy package json and install dependencies
COPY package*.json ./
# Copy our app
RUN npm cache clean –force
RUN npm install
COPY . .
RUN npm run build
# Expose port to access server
EXPOSE 8000
# Command to run our app
CMD [ "npm", "run", "preview" ]
