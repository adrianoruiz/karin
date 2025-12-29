.PHONY: help build up down restart logs shell db-shell migrate seed fresh install

# Cores para output
GREEN=\033[0;32m
NC=\033[0m

help: ## Mostra comandos disponíveis
	@echo "$(GREEN)SaaS Financial Dashboard - Comandos$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build das imagens Docker
	docker compose build

up: ## Inicia todos os containers
	docker compose up -d
	@echo "$(GREEN)App rodando em: http://localhost:8080$(NC)"

down: ## Para todos os containers
	docker compose down

restart: down up ## Reinicia containers

logs: ## Mostra logs em tempo real
	docker compose logs -f

shell: ## Acessa shell do container PHP
	docker compose exec app bash

db-shell: ## Acessa shell do PostgreSQL
	docker compose exec db psql -U saas_user -d saas_financial

migrate: ## Roda migrations
	docker compose exec app php artisan migrate

seed: ## Roda seeders
	docker compose exec app php artisan db:seed

fresh: ## Reset completo do banco + seed
	docker compose exec app php artisan migrate:fresh --seed

install: ## Instalação inicial completa
	@echo "$(GREEN)1. Copiando .env$(NC)"
	cp -n .env.example .env || true
	@echo "$(GREEN)2. Buildando containers$(NC)"
	docker compose build
	@echo "$(GREEN)3. Subindo containers$(NC)"
	docker compose up -d
	@echo "$(GREEN)4. Aguardando PostgreSQL...$(NC)"
	sleep 5
	@echo "$(GREEN)5. Instalando dependências PHP$(NC)"
	docker compose exec app composer install
	@echo "$(GREEN)6. Gerando APP_KEY$(NC)"
	docker compose exec app php artisan key:generate
	@echo "$(GREEN)7. Rodando migrations$(NC)"
	docker compose exec app php artisan migrate
	@echo "$(GREEN)8. Populando banco com dados demo$(NC)"
	docker compose exec app php artisan db:seed --class=DemoDataSeeder
	@echo ""
	@echo "$(GREEN)=== INSTALAÇÃO CONCLUÍDA ===$(NC)"
	@echo "Acesse: http://localhost:8080"

frontend: ## Inicia dev server do Vue
	docker compose run --rm node npm run dev
