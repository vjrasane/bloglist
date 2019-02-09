import moment from 'moment'
import { random } from 'lodash'

const randomId = () => moment().unix() + ':' + random(0, 1000)

const reducer = (notifs = [], action) => {
  switch (action.type) {
    case 'PUSH':
      return [...notifs, { ...action.notif, id: randomId() }]
    case 'POP':
      const n = [...notifs]
      n.shift()
      return n
    case 'CLEAR':
      return notifs.filter(({ id }) => id !== action.id)
    default:
      return notifs
  }
}

export const pushNotif = notif => ({
  type: 'PUSH',
  notif
})

export const clearNotif = id => ({
  type: 'CLEAR',
  id
})

export const notify = (message, type) => pushNotif({ message, type })

export default reducer
