/* Source: https://gist.github.com/voodooattack/b0484625a90191a4dde4aabae8884243#file-combine-graphql-js-L52 */
const {parse, visit} = require('graphql/language')

/**
 * Combine the fields of two or more AST nodes, does no error checking!
 * @param types An array with types to combine.
 * @returns {*}
 */

const combineASTTypes = (types) => {
  return types.reduce((p, n) => Object.assign(p, n, {fields: n.fields.concat(p.fields || [])}), {})
}

module.exports.combineASTTypes = combineASTTypes
/**
 * Combine multiple AST schemas into one. This will consolidate the Query, Mutation, and Subscription types if found.
 * @param schemas An array with the schemas to combine.
 * @returns {*}
 */

const combineASTSchemas = (schemas) => {
  const result = {kind: 'Document', definitions: []}
  const queries = []
  const mutations = []
  const subscriptions = []
  const withoutRootTypes = schemas.map(schema => visit(parse(schema), {
    enter (node /* key, parent, path, ancestors */) {
      if (node.kind === 'ObjectTypeDefinition') {
        if (node.name.value === 'Query') {
          queries.push(node)
          return null
        } else if (node.name.value === 'Mutation') {
          mutations.push(node)
          return null
        } else if (node.name.value === 'Subscription') {
          subscriptions.push(node)
          return null
        }
      }
    }
  }))
  const query = combineASTTypes(queries)
  const mutation = combineASTTypes(mutations)
  const subscription = combineASTTypes(subscriptions)
  if (queries.length) {
    result.definitions.push(query)
  }
  if (mutations.length) {
    result.definitions.push(mutation)
  }
  if (subscriptions.length) {
    result.definitions.push(subscription)
  }
  withoutRootTypes.forEach((schema) => {
    result.definitions = [...result.definitions, ...schema.definitions]
  })
  return result
}

module.exports.combineASTSchemas = combineASTSchemas
