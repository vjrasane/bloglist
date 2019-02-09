import React from 'react'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { clearNotif } from '../../redux/notifs'
import './index.styl'

const severities = {
  error: 'red',
  success: 'green',
  message: 'teal'
}

class Notification extends React.Component {
  state = {
    visible: true
  }

  clearAfter = millis => () => setTimeout(() => this.props.clear(this.props.id), millis)

  componentDidMount = () =>
    setTimeout(
      () => this.setState({ visible: false }, this.clearAfter(1000)),
      3000
    )

  render = () => (
    <div
      className={'notification ' + (this.state.visible ? 'visible' : 'hidden')}
    >
      <Segment inverted color={severities[this.props.type]}>
        {this.props.message}
      </Segment>
    </div>
  )
}

const NotificationFlow = ({ notifs, clearNotif }) => (
  <div className='notification-container'>
    {notifs.map((notif, i) => (
      <Notification
        key={`${notif.id}`}
        {...notif}
        clear={clearNotif}
      />
    ))}
  </div>
)

export default connect(
  ({ notifs }) => ({ notifs }),
  { clearNotif }
)(NotificationFlow)
