import React, { PropTypes } from 'react';

const Notification = (props) => {
  const { message, type } = props.notification;
  const notificationType = `notification--${type}`;
  if (type && message) {
    return (
      <div className="notification">
        <div className={ notificationType }>
          <div className="message">{ message }</div>
        </div>
      </div>);
  }
  return null;
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default Notification;
