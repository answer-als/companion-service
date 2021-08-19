FROM node:10.15-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /data/companionservice

COPY [".","/usr/src/app"]

WORKDIR /usr/src/app

RUN apk add --update --no-cache --virtual .gyp \
 	  python \
	  make \
	  g++ \
    && npm -g config set user root \
    && npm install \
    && npm install -g nodemon bunyan \
    && apk del .gyp

EXPOSE 3000

CMD nodemon /usr/src/app/app.mjs | bunyan
