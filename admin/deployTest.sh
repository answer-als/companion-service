eval $(docker-machine env answeralsdev)
docker build -t answer-als/companion-service:test .
docker stop test-companion-service
docker rm test-companion-service
docker system prune -f
docker run -d --name test-companion-service --restart always -v /data/companionservicetest:/data/companionservice -e AZURE_STORAGE_ACCOUNT -e AZURE_STORAGE_ACCESS_KEY -e "CONTAINER_NAME=test-companion-service" -l traefik.frontend.rule=Host:answeralsdev.evergreencircuits.com -l traefik.enable=true answer-als/companion-service:test
