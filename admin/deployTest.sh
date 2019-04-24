eval $(docker-machine env answeralsdev)
docker build -t answer-als/companion-service:test .
docker stop test-companion-service
docker rm test-companion-service
docker system prune -f
docker run -d --name test-companion-service --restart always -e "CONTAINER_NAME=test-companion-service" -l traefik.frontend.rule=Host:answeralsdev.evergreencircuits.com/test -l traefik.enable=true answer-als/companion-service:test
