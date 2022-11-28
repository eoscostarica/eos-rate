module.exports = {
  method: 'GET',
  path: '/healthz',
  handler: () => {
    return '<h2>EOS Rate HTTP API service</h2>'
  },
  options: {
    auth: false
  }
}
