import './ChatRoom.scss';
import avatar from '../../assets/images/avatar.png';
import Chatbox from './Chatbox';
import send from '../../assets/icons/send.png';

const ChatRoom = ({ chatDetail }) => {
  return (
    <section className="chatroom">
        <div className="chatroom__receiver-container">
          <img className="chatroom__image" src={avatar} />
          <p className="chatroom__name">{chatDetail.username}</p>
        </div>
        <div className="chatroom__content">
          {chatDetail.messages.map((message) => {
            return <Chatbox message={message} />;
          })}
        </div>
      <div className="chatroom__type-box">
        <img className="chatroom__send-button" src={send} />
      </div>
    </section>
  );
};

export default ChatRoom;
