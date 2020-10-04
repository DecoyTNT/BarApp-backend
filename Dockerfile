FROM node:14

RUN mkdir -p /usr/src/bar

WORKDIR /usr/src/bar

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENV NODE_ENV=production

CMD [ "npm", "start" ]