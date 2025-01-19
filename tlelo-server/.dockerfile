FROM node:22

RUN apt-get update && apt-get -y upgrade \
    && apt-get install -y wget build-essential

ENV TZ=America/Lima
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package*.json .

RUN npm install


COPY . .

CMD ["npm", "run", "start"]