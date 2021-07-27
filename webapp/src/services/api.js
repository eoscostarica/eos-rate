import qs from 'qs'
import store from '../store'

const http = (method) => (endpoint, body, options = {}) => {
  const token = store.getState().session
    ? store.getState().session.accessToken
    : null

  const params = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    params.headers.Authorization = `Bearer ${token}`
  }

  if (body) {
    if (method === 'GET') {
      endpoint = `${endpoint}?${qs.stringify(body)}`
    } else {
      params.body = JSON.stringify(body)
    }
  }

  return fetch(`${process.env.WEBAPP_EOS_API_URL}/${endpoint}`, params)
    .then((response) =>
      response.json().then((payload) => ({ payload, response }))
    )
    .then(({ response, payload }) =>
      response.ok ? payload : Promise.reject(payload)
    )
}

export default {
  get: http('GET'),
  post: http('POST'),
  put: http('PUT'),
  patch: http('PATCH'),
  delete: http('DELETE')
}
