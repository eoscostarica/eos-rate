import _get from 'lodash.get'

import { getRpc, getAccountName } from '../../utils/eosjs-utils'
import { mainConfig } from '../../config'
import { client } from '../../graphql'
import { GET_USER_RATING, GET_PRODUCER_BY_PRODUCER_LIST } from '../../gql'

export const getUserDataModeled = async ual => {
  let userRates = []
  let edenMember = false
  let listBPAccount = []

  const accountName = await getAccountName(ual)
  const rpc = getRpc(ual)

  const account = await rpc.get_account(accountName)
  const { rows: edenMembers } = await rpc.get_table_rows({
    json: true,
    code: mainConfig.contractEden,
    scope: 0,
    table: 'member',
    lower_bound: accountName,
    limit: 1,
    reverse: false,
    show_payer: false
  })

  if (edenMembers.length && edenMembers[0][1].account === accountName) {
    edenMember = true
  }

  const {
    data: { userRatings }
  } = await client.query({
    variables: { user: accountName },
    query: GET_USER_RATING,
    fetchPolicy: 'network-only'
  })

  const producers = _get(account, 'voter_info.producers', [])
  const proxy = _get(account, 'voter_info.proxy', '')

  if (userRatings.length) {
    listBPAccount = userRatings.map(({ bp }) => bp)
    const {
      data: { producerList }
    } = await client.query({
      variables: {
        producerList: listBPAccount
      },
      query: GET_PRODUCER_BY_PRODUCER_LIST,
      fetchPolicy: 'network-only'
    })

    userRates = userRatings.map(bpRated => {
      const item = (producerList || []).find(
        ({ owner }) => bpRated.bp === owner
      )

      return { ...item, ...bpRated }
    })
  }

  return {
    ...ual.activeUser,
    userData: {
      ...account,
      hasProxy: Boolean(proxy.length),
      producersCount: producers.length,
      userRates,
      edenMember,
      listBPAccount,
      proxyAccount: proxy
    }
  }
}
