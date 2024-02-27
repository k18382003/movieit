import MessageItem from './MessageItem';
import './MessageList.scss';

const MessageList = ({ messageList }) => {
  return (
    <section className="message-list">
      <h1 className="message-list__title">Invitation</h1>
      {messageList.map((message, index) => {
        return <MessageItem key={index} message={message} />;
      })}
    </section>
  );
};

export default MessageList;
