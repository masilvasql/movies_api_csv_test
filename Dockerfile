FROM node:21-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json /app

RUN npm install

COPY . /app

RUN npx prisma generate

RUN npx prisma migrate deploy

CMD ["npm", "run", "dev"]