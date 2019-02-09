import blogService from '../services/blogs'

const reducer = (blogs = [], action) => {
  switch (action.type) {
    case 'UPDATE_BLOG':
      const old = blogs.filter(b => b._id !== action.blog._id)
      return [...old, action.blog]
    case 'CREATE_BLOG':
      return [...blogs, action.blog]
    case 'REMOVE_BLOG':
      return blogs.filter(b => b._id !== action.blog._id)
    case 'SET_BLOGS':
      return action.blogs
    default:
      return blogs
  }
}

export const updateBlog = blog => ({
  type: 'UPDATE_BLOG',
  blog
})

export const createBlog = blog => ({
  type: 'CREATE_BLOG',
  blog
})

export const removeBlog = blog => ({
  type: 'REMOVE_BLOG',
  blog
})

export const initBlogs = () => async d => {
  const blogs = await blogService.getAll()
  d({
    type: 'SET_BLOGS',
    blogs
  })
  return blogs
}

export const setBlogs = blogs => ({
  type: 'SET_BLOGS',
  blogs
})

export default reducer
