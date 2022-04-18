FROM node:17-alpine

WORKDIR /usr/app

COPY app/ /usr/app/

RUN npm install

ENTRYPOINT ["node", "main.js"]

EXPOSE 3000