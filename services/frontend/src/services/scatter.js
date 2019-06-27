/**
 *  _____  ______ _____  _____  ______ _____       _______ ______ _____
 * |  __ \|  ____|  __ \|  __ \|  ____/ ____|   /\|__   __|  ____|  __ \
 * | |  | | |__  | |__) | |__) | |__ | |       /  \  | |  | |__  | |  | |
 * | |  | |  __| |  ___/|  _  /|  __|| |      / /\ \ | |  |  __| | |  | |
 * | |__| | |____| |    | | \ \| |___| |____ / ____ \| |  | |____| |__| |
 * |_____/|______|_|    |_|  \_\______\_____/_/    \_\_|  |______|_____/
 *
 */

import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'

const network = {
  blockchain: 'eos',
  protocol: 'http',
  host: 'jungle2.cryptolions.io',
  port: 80,
  chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
}

// singleton service
let scatter = null

export const getScatterInstance = async () => {
  if (scatter) return scatter
  try {
    ScatterJS.plugins(new ScatterEOS())
    const connected = await ScatterJS.scatter.connect('EOSRate')
    if (!connected) {
      alert('You need to install Scatter. Visit to scatter-eos.com')
      return null
    }
    scatter = ScatterJS.scatter
    window.ScatterJS = null
    return scatter
  } catch (err) {
    err && console.log(err)
    alert('Error getting scatter instance')
  }
}

export const getUserEOSAccout = async () => {
  if (!scatter) {
    await getScatterInstance()
  }
  try {
    await scatter.getIdentity({ accounts: [network] })
    // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
    // the user for their account name beforehand. They could still give you a different account.
    return scatter.identity.accounts.find(x => x.blockchain === 'eos')
  } catch (err) {
    alert(err.message)
    return {}
  }
}
