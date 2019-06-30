const config = {
  eosApiHost: process.env.REACT_APP_EOS_API_HOST,
  eosApiPort: process.env.REACT_APP_EOS_API_PORT,
  eosApiProtocol: process.env.REACT_APP_EOS_API_PROTOCOL,
  eosChainId: process.env.REACT_APP_EOS_CHAIN_ID,
  eosApiUri: `${process.env.REACT_APP_EOS_API_PROTOCOL}://${
    process.env.REACT_APP_EOS_API_HOST
  }:${process.env.REACT_APP_EOS_API_PORT}`
}

export default config
