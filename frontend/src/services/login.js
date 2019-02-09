import axios from 'axios'
const baseUrl = '/api/login'

let authToken
const setToken = token => {
  authToken = token
}

const axiosInstance = () => {
  const authHeaders = authToken ? { Authorization: `Bearer ${authToken}` } : {}
  return axios.create({
    headers: {
      common: authHeaders
    }
  })
}

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  setToken(response.data.token)
  return response.data
}

const logout = () => {
  setToken(null)
}

export default { login, logout, setToken, axiosInstance }
