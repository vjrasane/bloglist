import loginService from './login'
import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (obj) => {
  const response = await loginService.axiosInstance().post(baseUrl, obj)
  return response.data
}

export default { getAll, create }
