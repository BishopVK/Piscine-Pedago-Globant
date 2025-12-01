all:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose down
	docker compose up -d

fclean:
	docker compose down --rmi all --volumes --remove-orphans

.PHONY: Make Up Down Restart fclean
