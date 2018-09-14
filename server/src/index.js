const fastify = require("fastify");
const app = fastify();

const { graphiqlFastify, graphqlFastify } = require("fastify-graphql");
app.register(graphqlFastify, {
  prefix: "/graphql",
  graphql: {
    schema: your_graphql_schema
  }
});
app.register(graphiqlFastify, {
  prefix: "/graphiql",
  graphiql: {
    endpointURL: "/graphql"
  }
});
