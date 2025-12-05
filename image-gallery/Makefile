PROJECT_NAME = image-gallery
COMPOSE = docker compose -f docker-compose.yml

all: build up

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart

clean:
	$(COMPOSE) down -v --remove-orphans

fclean: clean
# Elimina solo imágenes del proyecto
	docker images "$(PROJECT_NAME)*" -q | xargs -r docker rmi

# Elimina solo contenedores del proyecto
	docker ps -a --filter "name=$(PROJECT_NAME)" -q | xargs -r docker rm -f

# Elimina solo redes del proyecto
	docker network ls --filter "name=$(PROJECT_NAME)" -q | xargs -r docker network rm

stop:
	$(COMPOSE) stop

re: fclean all

.PHONY: all build up down restart clean fclean stop re