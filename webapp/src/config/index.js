module.exports = {
  appName: 'EOSRate',
  contract: process.env.REACT_APP_RATING_CONTRACT || 'rateproducer',
  eosApiHost: process.env.REACT_APP_EOS_API_HOST,
  eosApiPort: process.env.REACT_APP_EOS_API_PORT,
  eosApiProtocol: process.env.REACT_APP_EOS_API_PROTOCOL,
  eosApiUri: `${process.env.REACT_APP_EOS_API_PROTOCOL}://${process.env.REACT_APP_EOS_API_HOST}:${process.env.REACT_APP_EOS_API_PORT}`,
  eosChainId: process.env.REACT_APP_EOS_CHAIN_ID,
  blockExplorer: process.env.REACT_APP_BLOCK_EXPLORER,
  networkMonitor: process.env.REACT_APP_NETWORK_MONITOR_URL
}
