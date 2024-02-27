import './ChatBox.scss';

const Chatbox = ({ message }) => {
  return (
    <div className="chatbox">
      <p className="chatbox__message">
        {message}
      </p>
      <p className="chatbox__timestamp">{new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default Chatbox;
