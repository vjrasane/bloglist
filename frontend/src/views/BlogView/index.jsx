import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Header,
  Form,
  Comment,
  Segment,
  Item,
  Button,
  Icon,
  Label
} from 'semantic-ui-react'
import blogService from '../../services/blogs'
import { notify } from '../../redux/notifs'
import './index.styl'

const FieldError = ({ message }) => (
  <Label basic color='red' pointing>
    {message}
  </Label>
)

const LinkButton = ({ url }) => (
  <Button icon color='blue' as={'a'} href={url}>
    <Icon name='linkify' />
  </Button>
)
const LikeButton = ({ likes, like }) => (
  <Button as='div' labelPosition='right'>
    <Button color='red' onClick={like}>
      <Icon name='heart' />
      Like
    </Button>
    <Label as='a' basic color='red' pointing='left'>
      {likes}
    </Label>
  </Button>
)

const DeleteButton = ({ remove }) => (
  <Button
    content='Remove'
    icon='trash alternate'
    labelPosition='right'
    onClick={remove}
  />
)

class BlogComments extends React.Component {
  state = {
    reply: '',
    error: ''
  }

  onReplyChange = (e, { value }) => this.setState({ reply: value })

  submit = async () => {
    let error = !this.state.reply ? 'Type something!' : null

    this.setState({ error })
    if (!error) {
      try {
        await blogService.comment({
          blog: this.props.blog._id,
          text: this.state.reply
        })
        this.props.notify(
          `Commented on blog '${this.props.blog.title}'`,
          'message'
        )
        this.setState({ reply: '' })
      } catch (ex) {
        this.props.notify(`error: ${ex}`, 'error')
      }
    }
  }

  render = () => (
    <Segment>
      <Comments comments={this.props.blog.comments} />
      <Form reply>
        <Form.TextArea value={this.state.reply} onChange={this.onReplyChange} />
        <Button
          onClick={this.submit}
          content='Add Reply'
          labelPosition='left'
          icon='edit'
          primary
        />
        {this.state.error && <FieldError message={this.state.error} />}
      </Form>
    </Segment>
  )
}

const Comments = ({ comments }) => (
  <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
    {comments.map(comment => (
      <Comment key={comment._id}>
        <Comment.Content>
          <Comment.Author as='a'>
            {comment.user ? comment.user.username : 'Anonymous'}
          </Comment.Author>
          <Comment.Text>{comment.text}</Comment.Text>
        </Comment.Content>
      </Comment>
    ))}
  </Comment.Group>
)

const canDelete = (user, blog) =>
  user && (!blog.user || blog.user.username === user.username)

const like = notify => async blog => {
  await blogService.like(blog)
  notify(`Liked blog '${blog.title}' by ${blog.author}`, 'message')
}

const remove = (notify, history) => async blog => {
  if (window.confirm(`Delete ''${blog.title}' by ${blog.author}'?`)) {
    await blogService.remove(blog._id)
    notify(`Removed blog '${blog.title}' by ${blog.author}`, 'success')
    history.push('/')
  }
}

const BlogActions = ({ blog, user, notify, history }) => (
  <Segment>
    <LikeButton likes={blog.likes} like={() => like(notify)(blog)} />
    <LinkButton url={blog.url} />
    {canDelete(user, blog) && (
      <DeleteButton remove={() => remove(notify, history)(blog)} />
    )}
  </Segment>
)

const BlogInfo = ({ blog, user }) => (
  <Segment>
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header as='a'>{blog.title}</Item.Header>
          <Item.Meta>{blog.author}</Item.Meta>
        </Item.Content>
      </Item>
    </Item.Group>
  </Segment>
)

class BlogView extends React.Component {
  render = () => {
    const { blog, user, notify, history } = this.props
    return blog ? (
      <div id='blog-view'>
        <Segment.Group>
          <BlogInfo blog={blog} />
          <BlogActions
            blog={blog}
            user={user}
            notify={notify}
            history={history}
          />
          <BlogComments blog={blog} notify={notify} />
        </Segment.Group>
      </div>
    ) : null
  }
}

const Connected = connect(
  ({ user, blogs }, { match }) => ({
    user,
    blog: blogs.find(b => b._id === match.params.id)
  }),
  { notify }
)(BlogView)

export default withRouter(Connected)
