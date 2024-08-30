FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Source
COPY . .

# Build the app
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Expose the port
EXPOSE 3000

CMD [ "npm", "start" ]