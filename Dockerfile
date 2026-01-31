FROM node:22-alpine

WORKDIR /

COPY . .

RUN yarn install --frozen-lockfile && yarn build

EXPOSE 1337

CMD ["yarn", "start"]
