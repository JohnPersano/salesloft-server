FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY src ./

RUN yarn install
RUN npm run build

EXPOSE 5000
CMD [ "npm", "run", "start" ]
