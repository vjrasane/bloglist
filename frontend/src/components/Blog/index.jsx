import React from 'react'
import { List, Icon, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const navigate = history => blog => () => history.push(`/blogs/${blog._id}`)

const Blog = ({ blog, history }) => (
  <List.Item onClick={navigate(history)(blog)}>
    <List.Content floated='right'>
      <Label color='red'>
        <Icon name='heart' />
        {blog.likes}
      </Label>
      <Label color='blue'>
        <Icon name='comment' />
        {blog.comments ? blog.comments.length : 0}
      </Label>
    </List.Content>
    <List.Icon name='newspaper outline' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a'>{blog.title}</List.Header>
      <List.Description as='a'>{blog.author}</List.Description>
    </List.Content>
  </List.Item>
)

export default withRouter(Blog)
