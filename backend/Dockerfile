FROM --platform=linux/amd64 node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ./dist ./

RUN npm install

CMD ["node", "index.js"]