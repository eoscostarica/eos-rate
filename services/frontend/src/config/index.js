const config = {
  appName: 'EOSRate',
  contract: 'rateproducer',
  eosApiHost: process.env.REACT_APP_EOS_API_HOST,
  eosApiPort: process.env.REACT_APP_EOS_API_PORT,
  eosApiProtocol: process.env.REACT_APP_EOS_API_PROTOCOL,
  eosApiUri: `${process.env.REACT_APP_EOS_API_PROTOCOL}://${process.env.REACT_APP_EOS_API_HOST}:${process.env.REACT_APP_EOS_API_PORT}`,
  eosChainId: process.env.REACT_APP_EOS_CHAIN_ID
}

export default config
