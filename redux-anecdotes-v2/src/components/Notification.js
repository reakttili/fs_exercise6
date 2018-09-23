import React from 'react'
import PropTypes from 'prop-types'
import { actionFor as actionForNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    //const { notification, bShow } = this.props.store.getState().notification
    const { notification, bShow } = this.props.notificationData
    if (bShow) {
      //setTimeout(() => this.props.store.dispatch(actionForNotification.hide()), 3000)
      //setTimeout(() => this.props.hide(), 3000)
      return (
        <div style={style}>
          {notification}
        </div>
      )
    } else {
      return ( <div style={style}></div>)
    }
  }
}

Notification.propTypes = {
  notificationData: PropTypes.object.isRequired,
  hide: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    notificationData: state.notification
  }
}

const mapDispatchToProps = {
  hide:actionForNotification.hide
}

//const ConnnectedNotification = connect()(Notification)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
