FROM node:10.15-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /data/companionservice

RUN apk add --update --no-cache --virtual \
    build_essential \
 	  python \
	  make \
	  g++ \
    && apk del build_essential

EXPOSE 3000

COPY [".","/usr/src/app"]

WORKDIR /usr/src/app

RUN npm install
RUN npm install -g nodemon bunyan

CMD nodemon /usr/src/app/app.mjs | bunyan
