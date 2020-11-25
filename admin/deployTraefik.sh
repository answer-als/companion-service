#eval $(docker-machine env dm-azure-test)
#export DOCKER_HOST=ssh://azure-test
export DOCKER_HOST=ssh://vm-prod
docker stop traefik
docker rm traefik
docker system prune -f
docker run -d --name traefik  --restart always -p 80:80 -p 443:443 -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v /data/traefik:/data/traefik -v /etc/traefik:/etc/traefik -l traefik.port=8080 traefik:v1.7.16
# -l traefik.frontend.rule=Host:monitor.service.answerals.org 
