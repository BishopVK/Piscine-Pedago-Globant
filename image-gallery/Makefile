COMPOSE = docker compose -f docker-compose.yml

all: build up

init-frontend:
	$(COMPOSE) exec frontend npm install

init-backend:
	$(COMPOSE) exec backend npm install

init: init-frontend init-backend

build:
	$(COMPOSE) build --no-cache

up:
	$(COMPOSE) up -d

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

exec-frontend:
	$(COMPOSE) exec frontend sh

exec-backend:
	$(COMPOSE) exec backend sh

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

clean:
	$(COMPOSE) down -v --remove-orphans

re: clean all

.PHONY: all build up logs ps exec-frontend exec-backend stop down clean re