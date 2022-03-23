const { hasuraUtil } = require('../utils')

const save = async lastSyncedAt => {
  const mutation = `
    mutation ($payload: hyperion_state_insert_input!) {
      insert_hyperion_state_one(object: $payload) {
        id
      }
    }
  `

  const data = await hasuraUtil.instance.request(mutation, {
    payload: {
      last_synced_at: lastSyncedAt
    }
  })

  return data.insert_hyperion_state_one
}

const update = async (id, lastSyncedAt) => {
  const mutation = `
    mutation ($id: uuid!, $payload: hyperion_state_set_input) {
      update_hyperion_state_by_pk(pk_columns: {id: $id}, _set: $payload) {
        id
        last_synced_at
      }
    }
  `

  await hasuraUtil.instance.request(mutation, {
    id,
    payload: {
      last_synced_at: lastSyncedAt
    }
  })
}

const getState = async () => {
  const query = `
    query {
      hyperion_state(where: {id: {_neq: "00000000-0000-0000-0000-000000000000"}}, limit: 1) {
        id
        last_synced_at
      }
    }
  `
  const data = await hasuraUtil.instance.request(query)

  if (!data.hyperion_state.length) {
    return
  }

  const state = data.hyperion_state[0]

  return {
    id: state.id,
    lastSyncedAt: state.last_synced_at
  }
}

const saveOrUpdate = async lastSyncedAt => {
  const currentState = await getState()

  if (!currentState) {
    await save(lastSyncedAt)

    return
  }

  await update(currentState.id, lastSyncedAt)
}

module.exports = {
  save,
  update,
  saveOrUpdate,
  getState
}
