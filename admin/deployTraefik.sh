eval $(docker-machine env answeralsdev)
docker stop traefik
docker rm traefik
docker system prune -f
docker run -d --name traefik  --restart always -p 80:80 -p 443:443 -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v /data/traefik:/etc/traefik traefik:latest
