import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import tokenPocket from 'eos-transit-tokenpocket-provider'

export const connectWallet = async (
  walletIndex,
  onSuccess,
  onError,
  setAccount
) => {
  const wallet = await getWallet(walletIndex)

  try {
    await wallet.connect()
    console.log('Successfully connected!')
    await wallet.login()
    console.log('Successfully logged in!')
    console.log('wallet', wallet)
    wallet && onSuccess && onSuccess()
    wallet && setAccount(wallet.accountInfo)
  } catch (err) {
    console.log('Error creating eos transit wallet instance: \n')
    console.log(err)
    onError && onError('Cannot connect to wallet')
  }
}

export const getWallet = async walletIndex => {
  const accessContext = initAccessContext({
    appName: 'EOSRate',
    network: {
      host: 'jungle2.cryptolions.io',
      port: 80,
      protocol: 'http',
      chainId:
        'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    },
    // walletProviders array order must match Wallets enum
    walletProviders: [scatter(), tokenPocket()]
  })
  const walletProviders = accessContext.getWalletProviders()
  const selectedProvider = walletProviders[walletIndex]
  const wallet = accessContext.initWallet(selectedProvider)

  return wallet
}
