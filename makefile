flush: scripts/flush.sh
	./scripts/flush.sh

start: scripts/start.sh
	./scripts/start.sh

hasura: scripts/hasura.sh
	./scripts/hasura.sh

migrate: scripts/migrate.sh
	./scripts/migrate.sh

pgweb: scripts/pgweb.sh
	./scripts/pgweb.sh

push-staging:
	@docker build -t eosrate-deployer \
		--build-arg ssh_prv_key="$(shell cat ~/.ssh/devops-eos.id_rsa)" \
		.
	@docker run \
		-e USER="$(USER)" \
		eosrate-deployer

FORCE:
