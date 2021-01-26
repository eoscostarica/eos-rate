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
	echo "Building containers..."
	@docker pull $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) || true
	@docker build \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(VERSION) --target server \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME_WEBAPP):$(LATEST_TAG) --target server \
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
