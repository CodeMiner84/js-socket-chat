FROM node:12.10.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8080

CMD ["yarn", "watch:dev"]
