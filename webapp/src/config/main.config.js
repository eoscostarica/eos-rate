export const appVersion = process.env.REACT_APP_TAG || 'v1.0'
export const name = process.env.REACT_APP_NAME
export const title = process.env.REACT_APP_TITLE
export const stage = process.env.REACT_APP_MAINNET_VERSION
export const logo = process.env.REACT_APP_LOGO
export const footerLinks = JSON.parse(
  process.env.REACT_APP_FOOTER_LINKS || '[]'
)
export const blockExplorer = process.env.REACT_APP_BLOCK_EXPLORER
export const contract = process.env.REACT_APP_RATING_CONTRACT || 'rateproducer'
export const contractEden =
  process.env.REACT_APP_EDEN_CONTRACT || 'genesis.eden'
export const networkMonitor = process.env.REACT_APP_NETWORK_MONITOR_URL
