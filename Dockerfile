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

# RUN cd /adventure-capitalist/src/backend/data && node app.js

# Run the specified command within the container.
CMD [ "npm", "start" ]