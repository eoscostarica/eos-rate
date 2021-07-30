include utils/meta.mk

#COLORS
WHITE  := $(shell tput -Txterm setaf 7)
BLUE   := $(shell tput -Txterm setaf 6)
YELLOW := $(shell tput -Txterm setaf 3)
GREEN  := $(shell tput -Txterm setaf 2)
RESET  := $(shell tput -Txterm sgr0)

K8S_BUILD_DIR ?= ./build_k8s
K8S_FILES := $(shell find ./kubernetes -name '*.yaml' | sed 's:./kubernetes/::g')

stop:
	@docker compose stop

clean:
	@docker compose stop
	@rm -rf db_data
	@rm -rf webapp/node_modules
	@rm -rf webapp/yarn.lock
	@rm -rf hapi/node_modules
	@rm -rf hapi/yarn.lock

## MAKE SURE YOU HAVE INITIALIZED THE PROJECT (make run) BEFORE RUN THIS
fresh: scripts/fresh.sh
	./scripts/fresh.sh

install: ##@local Install hapi dependencies
install:
	@cd ./hapi && yarn
	@cd ./webapp && yarn

run:
	make -B run-postgres
	make -B run-hapi
	make -B run-hasura
	make -B -j 3 run-hasura-cli run-logs run-webapp

run-postgres:
	mkdir -p $(POSTGRES_DATA)
	@docker compose up -d --build postgres

run-hapi:
	@docker compose up -d --build hapi
	@echo "done hapi"

run-hasura:
	$(eval -include .env)
	@until \
		docker compose exec -T postgres pg_isready; \
		do echo "$(BLUE)hasura |$(RESET) waiting for postgres service"; \
		sleep 5; done;
	@until \
		curl -s -o /dev/null -w 'hapi status %{http_code}\n' http://localhost:9090/healthz; \
		do echo "$(BLUE)hasura |$(RESET) waiting for hapi service"; \
		sleep 5; done;
	@docker compose stop hasura
	@docker compose up -d --build hasura
	@echo "done hasura"

run-hasura-cli:
	$(eval -include .env)
	@until \
		curl -s -o /dev/null -w 'hasura status %{http_code}\n' http://localhost:8080/healthz; \
		do echo "$(BLUE)hasura |$(RESET) waiting for hasura service"; \
		sleep 5; done;
	@cd hasura && hasura seeds apply --database-name default --admin-secret $(HASURA_GRAPHQL_ADMIN_SECRET) && echo "success!" || echo "failure!";
	@cd hasura && hasura console --endpoint http://localhost:8080 --skip-update-check --no-browser --admin-secret $(HASURA_GRAPHQL_ADMIN_SECRET);

run-webapp:
	$(eval -include .env)
	@until \
		curl -s -o /dev/null -w 'hasura status %{http_code}\n' http://localhost:8080/healthz; \
		do echo "$(BLUE)webapp |$(RESET) waiting for webapp service"; \
		sleep 5; done;
	@cd webapp && yarn && yarn start:local | cat
	@echo "done webapp"

run-logs:
	@docker compose logs -f hapi webapp

migrate: scripts/migrate.sh
	./scripts/migrate.sh

run-pgweb: scripts/pgweb.sh
	./scripts/pgweb.sh

push-staging:
	@docker build -t eosrate-deployer \
		--build-arg ssh_prv_key="$(SSH_PRV_KEY)" \
		.
	@docker run \
		-e USER="$(USER)" \
		eosrate-deployer

build-kubernetes: ##@devops Generate proper k8s files based on the templates
build-kubernetes: ./kubernetes
	@echo "Build kubernetes files..."
	@rm -Rf $(K8S_BUILD_DIR) && mkdir -p $(K8S_BUILD_DIR)
	@for file in $(K8S_FILES); do \
		mkdir -p `dirname "$(K8S_BUILD_DIR)/$$file"`; \
		$(SHELL_EXPORT) envsubst <./kubernetes/$$file >$(K8S_BUILD_DIR)/$$file; \
	done

deploy-kubernetes: ##@devops Publish the build k8s files
deploy-kubernetes: $(K8S_BUILD_DIR)
	@kubectl create ns $(NAMESPACE) || echo "Namespace '$(NAMESPACE)' already exists.";
	@echo "Creating SSL certificates..."
	kubectl create secret tls \
		tls-secret \
		--key ./ssl/eosrate.cr.priv.key \
		--cert ./ssl/eosrate.cr.crt \
		-n $(NAMESPACE)  || echo "SSL cert already configured.";
	@echo "Applying kubernetes files..."
	@for file in $(shell find $(K8S_BUILD_DIR) -name '*.yaml' | sed 's:$(K8S_BUILD_DIR)/::g'); do \
		kubectl apply -f $(K8S_BUILD_DIR)/$$file -n $(NAMESPACE) || echo "${file} Cannot be updated."; \
	done

build-docker-images: ##@devops Build docker images
build-docker-images:
	@echo "Building docker containers..."
	@for dir in $(SUBDIRS); do \
		$(MAKE) build-docker -C $$dir; \
	done

push-docker-images: ##@devops Publish docker images
push-docker-images:
	@echo $(DOCKER_PASSWORD) | docker login \
		--username $(DOCKER_USERNAME) \
		--password-stdin
	for dir in $(SUBDIRS); do \
		$(MAKE) push-image -C $$dir; \
	done
