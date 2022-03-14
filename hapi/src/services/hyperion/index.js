const moment = require('moment')

const { hasuraConfig } = require('../../config')
const { hasuraUtil, axiosUtil, sleepUtil } = require('../../utils')
const hyperionStateService = require('../hyperion-state.service')

const updaters = require('./updaters')

const TIME_BEFORE_IRREVERSIBILITY = 164

const getLastSyncedAt = async () => {
  const state = await hyperionStateService.getState()

  if (state) {
    return state.lastSyncedAt
  }

  await hyperionStateService.saveOrUpdate(hyperionConfig.startAt)

  return hyperionConfig.startAt
}

const getGap = lastSyncedAt => {
  if (moment().diff(moment(lastSyncedAt), 'days') > 0) {
    return {
      amount: 1,
      unit: 'day'
    }
  }

  if (moment().diff(moment(lastSyncedAt), 'hours') > 0) {
    return {
      amount: 1,
      unit: 'hour'
    }
  }

  if (
    moment().diff(moment(lastSyncedAt), 'seconds') >=
    TIME_BEFORE_IRREVERSIBILITY * 2
  ) {
    return {
      amount: TIME_BEFORE_IRREVERSIBILITY,
      unit: 'seconds'
    }
  }

  if (
    moment().diff(moment(lastSyncedAt), 'seconds') >=
    TIME_BEFORE_IRREVERSIBILITY + 10
  ) {
    return {
      amount: 10,
      unit: 'seconds'
    }
  }

  return {
    amount: 1,
    unit: 'seconds'
  }
}

const getActions = async params => {
  const limit = 100
  const { data } = await axiosUtil.get(
    `${hyperionConfig.api}/v2/history/get_actions`,
    {
      params: {
        ...params,
        limit,
        filter: updaters.map(updater => updater.type).join(','),
        sort: 'asc',
        simple: true,
        checkLib: true
      }
    }
  )
  const notIrreversible = data.simple_actions.find(item => !item.irreversible)

  if (notIrreversible) {
    await sleepUtil(1)

    return getActions(params)
  }

  return {
    hasMore: data.total.value > limit + params.skip || 0,
    actions: data.simple_actions
  }
}

const runUpdaters = async actions => {
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index]
    const updater = updaters.find(
      item => item.type === `${action.contract}:${action.action}`
    )

    if (!updater) {
      continue
    }

    await updater.apply(action)
  }
}

const sync = async () => {
  await hasuraUtil.hasuraAssembled()
  const lastSyncedAt = await getLastSyncedAt()
  const gap = getGap(lastSyncedAt)
  const after = moment(lastSyncedAt).toISOString()
  const before = moment(after).add(gap.amount, gap.unit).toISOString()
  const diff = moment().diff(moment(before), 'seconds')
  let skip = 0
  let hasMore = true
  let actions = []

  if (diff < TIME_BEFORE_IRREVERSIBILITY) {
    await sleepUtil(TIME_BEFORE_IRREVERSIBILITY - diff)

    return sync()
  }

  try {
    while (hasMore) {
      ;({ hasMore, actions } = await getActions({ after, before, skip }))

      skip += actions.length
      await runUpdaters(actions)
    }
  } catch (error) {
    console.error('hyperion error', error.message)
    await sleepUtil(5)

    return sync()
  }

  await hyperionStateService.saveOrUpdate(before)

  return sync()
}

const syncWorker = () => {
  return {
    name: 'SYNC ACTIONS',
    action: sync
  }
}

module.exports = {
  syncWorker
}
