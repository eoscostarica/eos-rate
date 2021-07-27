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
	@$(SHELL_EXPORT) yarn run dev

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	echo "Building containers..."
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) || true
	@docker build \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION) --target server \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) --target server \
		--build-arg webapp_graphql_http_url="$(WEBAPP_GRAPHQL_HTTP_URL)" \
		--build-arg webapp_graphql_ws_url="$(WEBAPP_GRAPHQL_WS_URL)" \
		--build-arg webapp_eos_api_url="$(WEBAPP_EOS_API_URL)" \
		--build-arg webapp_eos_api_host="$(WEBAPP_EOS_API_HOST)" \
		--build-arg webapp_eos_api_port="$(WEBAPP_EOS_API_PORT)" \
		--build-arg webapp_eos_api_protocol="$(WEBAPP_EOS_API_PROTOCOL)" \
		--build-arg webapp_eos_chain_id="$(WEBAPP_EOS_CHAIN_ID)" \
		--build-arg webapp_block_explorer="$(WEBAPP_BLOCK_EXPLORER)" \
		--build-arg webapp_network_monitor_url="$(WEBAPP_NETWORK_MONITOR_URL)" \
		--build-arg branch="$(BRANCH)" \
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
