FROM --platform=linux/amd64 node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ./dist ./
COPY ./.env ./
COPY ./config ./config

RUN source .env
RUN npm install

CMD ["node", "index.js"]