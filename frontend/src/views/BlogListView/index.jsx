import React from 'react'
import BlogList from '../../components/BlogList'
import { Button, Segment, Form, Input, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import blogService from '../../services/blogs'
import { notify } from '../../redux/notifs'
import { isUrl } from 'is-valid-url'
import Filter from 'bad-words'

import './index.styl'

const profanity = new Filter()

const FieldError = ({ message }) => (
  <Label basic color='red' pointing>
    {message}
  </Label>
)

class AddSidebar extends React.Component {
  state = {
    inputs: { title: '', author: '', url: '' },
    errors: {}
  }

  updateField = field => (e, { value }) =>
    this.setState({ inputs: { ...this.state.inputs, [field]: value } })

  submit = async () => {
    const { title, author } = this.state.inputs
    const errors = Object.entries(this.state.inputs).reduce(
      (errs, [field, input]) => {
        let error = !input ? 'Cannot be empty!' : null
        error = profanity.isProfane(input) ? 'Contains profanity!' : error
        return error ? { ...errs, [field]: error } : errs
      },
      {}
    )

    if (!isUrl(this.state.inputs.url)) {
      errors.url = 'Not a valid URL!'
    }

    this.setState({ errors })
    if (!Object.keys(errors).length) {
      try {
        await blogService.create(this.state.inputs)
        this.props.notify(`Added new blog '${title}' by ${author}`, 'success')
        this.setState({ inputs: { title: '', author: '', url: '' } })
        this.props.toggle()
      } catch (ex) {
        this.props.notify(`Failed to add blog: ${ex}`, 'error')
      }
    }
  }

  render = () => {
    const { errors } = this.state
    return (
      <div
        id='blog-add-sidebar'
        className={this.props.active ? 'open' : 'closed'}
      >
        <Segment>
          <Form>
            {['Title', 'Author', 'URL'].map(field => {
              const lower = field.toLowerCase()
              return (
                <Form.Field key={field}>
                  <label>{field}</label>
                  <Input
                    placeholder={field}
                    value={this.state.inputs[lower]}
                    onChange={this.updateField(lower)}
                  />
                  {errors[lower] && <FieldError message={errors[lower]} />}
                </Form.Field>
              )
            })}
            <Button onClick={this.submit}>Submit</Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

const Overlay = ({ active, toggle }) => (
  <div
    id='blog-add-overlay'
    className={active ? 'on' : 'off'}
    onClick={toggle}
  />
)

class BlogView extends React.Component {
  state = {
    sidebar: false
  }

  toggleSidebar = () => this.setState({ sidebar: !this.state.sidebar })

  render = () => (
    <div id='blog-list-view'>
      <Button
        color='green'
        icon='plus'
        labelPosition='right'
        content='Add'
        onClick={this.toggleSidebar}
      />
      <BlogList blogs={this.props.blogs} />
      <AddSidebar
        active={this.state.sidebar}
        toggle={this.toggleSidebar}
        notify={this.props.notify}
      />
      <Overlay active={this.state.sidebar} toggle={this.toggleSidebar} />
    </div>
  )
}

export default connect(
  ({ blogs }) => ({ blogs }),
  { notify }
)(BlogView)
