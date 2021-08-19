docker-compose build --no-cache --progress=plain
export DOCKER_HOST=ssh://aals-test
#docker build -t answer-als/companion-service .
docker stop companion-service
docker rm companion-service
docker system prune -f
docker run -d --name companion-service --restart always -l traefik.port=3000 -l traefik.foo.frontend.rule=Host:service-dev.answerals.org -l traefik.bar.frontend.rule=Host:service.answerals.org -l traefik.enable=true
