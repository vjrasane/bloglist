import loginService from './login'
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => {
  const response = await loginService.axiosInstance().post(baseUrl, blog)
  return response.data
}

const update = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const like = async blog => {
  const response = await axios.put(`${baseUrl}/${blog._id}`, { ...blog, likes: blog.likes + 1 })
  return response.data
}

const remove = async id => {
  const response = await loginService.axiosInstance().delete(`${baseUrl}/${id}`)
  return response
}

const comment = async comment => {
  const response = await loginService.axiosInstance().post(`${baseUrl}/${comment.blog}/comments`, comment)
  return response.data
}

export default { getAll, create, update, remove, comment, like }
