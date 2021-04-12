FROM node:alpine

COPY ./package* ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]