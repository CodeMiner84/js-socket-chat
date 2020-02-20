FROM node:12.10.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN yarn install --frozen-lockfile

RUN npm i -g @nestjs/cli

COPY . .

EXPOSE 8080

CMD ["yarn", "start:dev"]
