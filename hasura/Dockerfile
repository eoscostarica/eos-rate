FROM hasura/graphql-engine:v2.0.3.cli-migrations-v2

ARG hasura_graphql_migrations_dir
ARG hasura_graphql_metadata_dir

ENV HASURA_GRAPHQL_MIGRATIONS_DIR $hasura_graphql_migrations_dir
ENV HASURA_GRAPHQL_METADATA_DIR $hasura_graphql_metadata_dir
ENV PORT_HASURA 8080

EXPOSE $PORT_HASURA

COPY migrations $HASURA_GRAPHQL_MIGRATIONS_DIR
COPY metadata $HASURA_GRAPHQL_METADATA_DIR

CMD graphql-engine \
  serve \
  --database-url $HASURA_GRAPHQL_DATABASE_URL 