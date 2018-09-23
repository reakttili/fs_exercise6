import { SSL_OP_EPHEMERAL_RSA } from "constants";

const initialNotification = 'Alkuhuomio!'

const reducer = (store = { notification: initialNotification, bShow: false }, action) => {
  switch (action.type) {
  case 'SET':
    store = action.notification
    return store
  case 'CREATE':
    store = { ...store, notification: 'created!' }
    return store
  case 'VOTE':
    return store
  case 'SHOW':
    store = { ...store, bShow:true }
    return store
  case 'HIDE':
    store = { ...store, bShow:false }
    return store
  default:
    return store
  }


}

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s*1000))
}

export const actionFor = {
  settingNotification(notification) {
    return { type: 'SET', notification }
  },
  show() {
    return { type: 'SHOW' }
  },
  hide() {
    return { type: 'HIDE' }
  },
  notify(message, delay) {
    return async (dispatch, getState) => {
      console.log(getState())
      dispatch({
        type: 'SET',
        notification: { notification:message, bShow:true }
      })
      await sleep(delay)
      dispatch({
        type: 'SET',
        notification: { notification:'', bShow:false }
      })
    }
  }
}
export { reducer }
