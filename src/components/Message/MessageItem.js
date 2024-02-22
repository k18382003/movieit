import './MessageItem.scss';
import avatar from '../../assets/images/avatar.png';

const MessageItem = ({ message }) => {
  return (
    <div className="message-item">
      <img className="message-item__image" src={avatar} />
      <div className="message-item__info-container">
        <p className="message-item__name-time">
          <span className="message-item__name">{message.username}</span>
          <span className="message-item__time">{message.timeStamp}</span>
        </p>
        <p
          className={
            message.unreadMessage === 0
              ? 'message-item__unread-message'
              : 'message-item__unread-message message-item__unread-message--green'
          }
        >
          {message.unreadMessage} unread message
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
