#!/bin/bash
export DOCKER_HOST=ssh://aals-test
docker build --no-cache -t companion-service .
docker stop companion-service
docker rm companion-service
docker system prune -f
docker run -d --name companion-service \
  --restart always \
  -p 3000:3000 \
  -v /data/companionservice:/data/companionservice \
  --env-file .env \
  -e "CONTAINER_NAME=companion-service" \
  -l traefik.port=3000 \
  -l traefik.foo.frontend.rule=Host:service-dev.answerals.org \
  -l traefik.bar.frontend.rule=Host:service.answerals.org \
  -l traefik.enable=true \
  companion-service
