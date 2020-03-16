flush: scripts/flush.sh
	./scripts/flush.sh

fresh: scripts/fresh.sh
	./scripts/fresh.sh

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
		--build-arg ssh_prv_key="$(SSH_PRV_KEY)" \
		.
	@docker run \
		-e USER="$(USER)" \
		eosrate-deployer

FORCE:
