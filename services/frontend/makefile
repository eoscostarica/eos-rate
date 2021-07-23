include ../../utils/meta.mk

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
		--build-arg react_app_graphql_http_url="$(REACT_APP_GRAPHQL_HTTP_URL)" \
		--build-arg react_app_graphql_ws_url="$(REACT_APP_GRAPHQL_WS_URL)" \
		--build-arg react_app_eos_api_url="$(REACT_APP_EOS_API_URL)" \
		--build-arg react_app_eos_api_host="$(REACT_APP_EOS_API_HOST)" \
		--build-arg react_app_eos_api_port="$(REACT_APP_EOS_API_PORT)" \
		--build-arg react_app_eos_api_protocol="$(REACT_APP_EOS_API_PROTOCOL)" \
		--build-arg react_app_eos_chain_id="$(REACT_APP_EOS_CHAIN_ID)" \
		--build-arg react_app_block_explorer="$(REACT_APP_BLOCK_EXPLORER)" \
		--build-arg react_network_monitor_url="$(REACT_APP_NETWORK_MONITOR_URL)" \
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
