# Use the official image as a parent image
FROM node:lts-alpine

# Set the working directory.
WORKDIR "/adventure-capitalist"

#Copy the file from host to current location
COPY package.json .

# Run the command inside your iamge filesyste.
RUN npm install

# copy the rest of app's source code from host to image files
COPY . .

# Add the metadata to the image to describe which port the container is listening to 
EXPOSE 3000

# Run the specified command within the container.
RUN npm start

EXPOSE 8321

WORKDIR "/adventure-capitalist/src/backend/data"
CMD ["sh", "-c", "node app.js"]
