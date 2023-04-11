# Base image
FROM node
# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app/backend
RUN apt-get update && apt-get install -y iputils-ping
# Copy package json and install dependencies
COPY package*.json ./
RUN npm install glob rimraf --legacy-peer-deps
RUN npm install --legacy-peer-deps
COPY . .
RUN ["npm","run","build"]
EXPOSE 3000
CMD ["npm" , "run", "start:prod"]
