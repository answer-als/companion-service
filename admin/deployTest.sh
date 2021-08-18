export DOCKER_HOST=ssh://aals-test
docker build -t answer-als/companion-service .
docker stop companion-service
docker rm companion-service
docker system prune -f
docker run -d --restart always -v /data/companionservicetest:/data/companionservice answer-als/companion-service
