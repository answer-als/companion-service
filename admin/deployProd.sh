eval $(docker-machine env answeralsdev)
tag=$(date '+%Y-%m-%d')-prod
docker tag answer-als/companion-service:test answer-als/companion-service:$tag
docker stop companion-service
docker rm companion-service
docker system prune -f
docker run -d --name companion-service --restart always -v /data/companionservice:/data/companionservice -e AZURE_STORAGE_ACCOUNT_PROD -e AZURE_STORAGE_ACCESS_KEY_PROD -e "CONTAINER_NAME=companion-service" -l traefik.frontend.rule=Host:answerals.evergreencircuits.com -l traefik.enable=true answer-als/companion-service:$tag
