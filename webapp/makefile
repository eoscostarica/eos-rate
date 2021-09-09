include ../utils/meta.mk

LATEST_TAG ?= latest

install: ##@local Install all dependencies
install:
	@yarn

clean-install: ##@local Reinstalls all dependencies
clean-install:
	@rm -Rf node_modules
	@yarn

run: ##@local Run the project locally (without docker)
run: node_modules
	@echo "DOCKER WEBAPP RUN"
	@$(SHELL_EXPORT) yarn run dev

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	@echo "DOCKER WEBAPP"
	echo "Building containers..."
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) || true
	@docker build \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION) --target server \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) --target server \
		--build-arg REACT_APP_RATING_CONTRACT="$(REACT_APP_RATING_CONTRACT)" \
		--build-arg REACT_APP_MAINNET_VERSION="$(REACT_APP_MAINNET_VERSION)" \
		--build-arg REACT_APP_EDEN_CONTRACT="$(REACT_APP_EDEN_CONTRACT)" \
		--build-arg REACT_APP_GRAPHQL_HTTP_URL="$(REACT_APP_GRAPHQL_HTTP_URL)" \
		--build-arg REACT_APP_GRAPHQL_WS_URL="$(REACT_APP_GRAPHQL_WS_URL)" \
		--build-arg REACT_APP_EOS_API_URL="$(REACT_APP_EOS_API_URL)" \
		--build-arg REACT_APP_EOS_API_HOST="$(REACT_APP_EOS_API_HOST)" \
		--build-arg REACT_APP_EOS_API_PORT="$(REACT_APP_EOS_API_PORT)" \
		--build-arg REACT_APP_EOS_API_PROTOCOL="$(REACT_APP_EOS_API_PROTOCOL)" \
		--build-arg REACT_APP_EOS_CHAIN_ID="$(REACT_APP_EOS_CHAIN_ID)" \
		--build-arg REACT_APP_BLOCK_EXPLORER="$(REACT_APP_BLOCK_EXPLORER)" \
		--build-arg REACT_APP_NETWORK_MONITOR_URL="$(REACT_APP_NETWORK_MONITOR_URL)" \
		.

pull-image: ##@devops Pull the latest image from registry for caching
pull-image:
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) || true

build-docker-cached: ##@devops Build the docker image using cached layers
build-docker-cached: ./Dockerfile
	@docker build \
		--target prod-stage \
		--cache-from $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) \
		.

push-image: ##@devops Push the freshly built image and tag with release or latest tag
push-image:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION)
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG)
