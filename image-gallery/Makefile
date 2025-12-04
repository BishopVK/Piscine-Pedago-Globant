all:
	docker compose -f docker-compose.yml up --build

down:
	docker compose -f docker-compose.yml down

up:
	docker compose -f docker-compose.yml up -d

restart:
	docker compose -f docker-compose.yml restart

clean:
	docker compose -f docker-compose.yml down -v

fclean: clean
	docker compose -f docker-compose.yml rm -f
	docker rmi $$(docker images -f "dangling=true" -q)
	docker system prune -f
	docker volume prune -f
	docker network prune -f
	docker image prune -f
	docker builder prune -f
	docker container prune -f
	docker compose -f docker-compose.yml build --no-cache
	docker compose -f docker-compose.yml up --build -d

stop:
	docker compose -f docker-compose.yml stop

re: fclean all

.PHONY: all down up restart clean fclean stop re