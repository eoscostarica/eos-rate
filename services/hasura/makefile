include ../../utils/meta.mk

LATEST_TAG ?= latest

install: ##@local Install all dependencies
install:
	@npm install

clean-install: ##@local Reinstalls all dependencies
clean-install:
	@rm -Rf node_modules
	@npm install

run: ##@local Run the project locally (without docker)
run: node_modules
	@$(SHELL_EXPORT) npm run dev

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) || true
	@docker build \
                --build-arg hasura_graphql_migrations_dir=hasura-migrations \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		.

pull-image: ##@devops Pull the latest image from registry for caching
pull-image:
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) || true

build-docker-cached: ##@devops Build the docker image using cached layers
build-docker-cached: ./Dockerfile
	@docker build \
		--build-arg hasura_graphql_migrations_dir=/hasura-migrations \
		--cache-from $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(LATEST_TAG) \
		.

push-image: ##@devops Push the freshly built image and tag with release or latest tag
push-image:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_HASURA):$(VERSION)
