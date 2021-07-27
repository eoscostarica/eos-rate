const config = {
  appName: 'EOSRate',
  contract: 'rateproducer',
  eosApiHost: process.env.WEBAPP_EOS_API_HOST,
  eosApiPort: process.env.WEBAPP_EOS_API_PORT,
  eosApiProtocol: process.env.WEBAPP_EOS_API_PROTOCOL,
  eosApiUri: `${process.env.WEBAPP_EOS_API_PROTOCOL}://${process.env.WEBAPP_EOS_API_HOST}:${process.env.WEBAPP_EOS_API_PORT}`,
  eosChainId: process.env.WEBAPP_EOS_CHAIN_ID,
  blockExplorer: process.env.WEBAPP_BLOCK_EXPLORER,
  networkMonitor: process.env.WEBAPP_NETWORK_MONITOR_URL
}

export default config
