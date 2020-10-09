FROM node:lts-alpine

WORKDIR "/adventure-capitalist"

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]