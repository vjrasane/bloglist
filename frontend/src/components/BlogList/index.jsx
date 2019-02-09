import React from 'react'
import { List, Header } from 'semantic-ui-react'
import Blog from '../Blog'

const BlogList = ({ blogs }) =>
  blogs && blogs.length ? (
    <List animated divided relaxed verticalAlign='middle'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(b => (
          <Blog key={b._id} blog={b} />
        ))}
      <hr />
    </List>
  ) : (
    <Header.Subheader>There seems to be nothing here!</Header.Subheader>
  )

export default BlogList
