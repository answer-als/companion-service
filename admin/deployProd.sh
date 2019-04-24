eval $(docker-machine env answeralsdev)
tag=$(date '+%Y-%m-%d')-prod
docker tag answer-als/companion-service:test answer-als/companion-service:$tag
docker stop companion-service
docker rm companion-service
docker system prune -f
docker run -d --name companion-service --restart always -e "CONTAINER_NAME=companion-service" -l traefik.frontend.rule=Host:answeralsdev.evergreencircuits.com -l traefik.enable=true answer-als/companion-service:$tag
