-include .env

VERSION ?= $(shell git rev-parse --short HEAD)

IMAGE_NAME_WEBAPP=eosrate-webapp
IMAGE_NAME_HAPI=eosrate-hapi
IMAGE_NAME_HASURA=eosrate-hasura

DOCKER_REGISTRY=eoscostarica506
SUBDIRS = webapp hapi hasura

MAKE_ENV += DOCKER_REGISTRY VERSION IMAGE_NAME_WEBAPP IMAGE_NAME_HAPI IMAGE_NAME_HASURA

SHELL_EXPORT := $(foreach v,$(MAKE_ENV),$(v)='$($(v))')

ifneq ("$(wildcard .env)", "")
	export $(shell sed 's/=.*//' .env)
endif
