FROM node:10.15-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /data/companionservice
WORKDIR /usr/src/app

RUN apk add --update --no-cache --virtual \
    build_essential \
 	  python \
	  make \
	  g++ \
    && apk del build_essential

RUN npm install -g nodemon bunyan

EXPOSE 3000
