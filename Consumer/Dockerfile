FROM node:latest

WORKDIR /opt/app/

COPY package*.json ./

RUN npm install --quiet

COPY . .

CMD npm run start
