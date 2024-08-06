FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

ENV PORT=3001

EXPOSE 3000

CMD ["yarn", "dev"]
