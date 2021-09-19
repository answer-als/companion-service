export DOCKER_HOST=ssh://azure-test
docker build -t answer-als/companion-service:test .
docker stop test-companion-service
docker rm test-companion-service
docker system prune -f
docker run -d --name test-companion-service \
  --restart always \
  -p 3000:3000 \
  -v /data/companionservicetest:/data/companionservice \
  -e AZURE_STORAGE_ACCOUNT=answeralsvoice \
  -e AZURE_STORAGE_ACCESS_KEY={AZURE_KEY} \
  -e "CONTAINER_NAME=test-companion-service" \
  -l traefik.port=3000 \
  -l traefik.foo.frontend.rule=Host:service-dev.answerals.org \
  -l traefik.bar.frontend.rule=Host:service.answerals.org \
  -l traefik.enable=true \
  answer-als/companion-service:test
