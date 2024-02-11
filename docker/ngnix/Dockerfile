FROM nginx:latest

COPY html /usr/share/nginx
COPY . /app
ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off" ]
# WORKDIR /app
# RUN apt-get update && apt-get install vim -y


