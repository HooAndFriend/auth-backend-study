FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ENV TZ=Asia/Seoul

CMD ["yarn", "dev"]
