import './MessageItem.scss';
import avatar from '../../assets/images/avatar.png';
import Button from '../Button/Button';

const MessageItem = ({ message }) => {
  return (
    <div className="message-item">
      <img className="message-item__image" src={avatar} />
      <div className="message-item__info-container">
        <p className="message-item__name-time">
          <span className="message-item__name">{message.username}</span>
          <span className="message-item__time">{message.timeStamp}</span>
        </p>
        <div className="message-item__button-group">
          <Button
            buttonText={'DETAIL'}
            UniqueStyleClass={
              'message-item__button message-item__button--detail'
            }
          />
          <Button
            buttonText={'DENIED'}
            UniqueStyleClass={'message-item__button message-item__button--denied'}
          />
        </div>
        {/* <p
          className={
            message.unreadMessage === 0
              ? 'message-item__unread-message'
              : 'message-item__unread-message message-item__unread-message--green'
          }
        >
          {message.unreadMessage} unread message
        </p> */}
      </div>
    </div>
  );
};

export default MessageItem;
