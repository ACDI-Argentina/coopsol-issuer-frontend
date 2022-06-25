FROM node:14-alpine

WORKDIR /usr/src/app

RUN npm install http-server-spa -g

COPY package*.json ./
RUN npm ci --only=prod

COPY . .

EXPOSE 8080

CMD ["ash", "docker-run.sh"]

