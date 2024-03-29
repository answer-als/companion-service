FROM node:10.15-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /data/companionservice

COPY [".","/usr/src/app"]

WORKDIR /usr/src/app

RUN apk --update add --no-cache --virtual .gyp \
 	  python \
	  make \
	  g++

RUN npm -g config set user root \
    && npm install --loglevel verbose \
    && npm install -g nodemon bunyan \
    && npm i -g eslint \
    && apk del .gyp

EXPOSE 3000

CMD [ "node", "--experimental-modules", "app.mjs" ]
