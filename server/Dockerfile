FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm build
RUN npm getPosts

COPY . .

EXPOSE 3012

CMD ["npm", "start"]
