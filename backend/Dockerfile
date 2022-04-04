FROM node:alpine

WORKDIR /backend

COPY ./build/package.json ./

RUN npm install

COPY ./build/index.js ./
COPY ./config ./

CMD node index.js