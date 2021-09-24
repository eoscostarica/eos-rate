import { getRpc, getAccountName } from '../../utils/eosjs-utils'
import { mainConfig } from '../../config'
import { client } from '../../graphql'
import { GET_USER_RATING } from '../../gql'

export const getUserDataModeled = async ual => {
  // let userRates = []
  let edenMember = false

  const accountName = await getAccountName(ual)
  const rpc = getRpc(ual)

  console.log({ rpc, accountName })

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

  if (edenMembers[0][1].account === accountName) {
    edenMember = true
  }

  const {
    data: { userRatings }
  } = await client.query({
    variables: { user: accountName },
    query: GET_USER_RATING
  })

  console.log({ userRatings, edenMember, edenMembers })

  return {}
}
