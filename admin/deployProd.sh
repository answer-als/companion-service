#!/bin/bash
export DOCKER_HOST=ssh://vm-prod
tag=$(date '+%Y-%m-%d')-prod
docker build --no-cache -t answer-als/companion-service:$tag .
docker stop companion-service
docker rm companion-service
docker system prune -f
docker run -d --name companion-service \
  --restart always \
  -p 3000:3000 \
  -v /data/companionservice:/data/companionservice \
  -e AZURE_STORAGE_ACCOUNT_PROD \
  -e AZURE_STORAGE_ACCESS_KEY_PROD \
  -e "CONTAINER_NAME=companion-service" \
  -l traefik.port=3000 \
  -l traefik.foo.frontend.rule=Host:service-prod.answerals.org \
  -l traefik.bar.frontend.rule=Host:service.answerals.org \
  -l traefik.enable=true \
  answer-als/companion-service:$tag
