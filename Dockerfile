FROM node:10.15-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN apk add --update --no-cache --virtual \
    build_essential \
	python \
	make \
	g++ \
    && npm install \
    && apk del build_essential
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]
