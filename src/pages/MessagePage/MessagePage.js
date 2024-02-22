import ChatRoom from '../../components/Message/ChatRoom';
import Chatbox from '../../components/Message/Chatbox';
import MessageList from '../../components/Message/MessageList';

const MessagePage = () => {
  const tempData = [
    { username: 'Sammie', timeStamp: '5 sec ago', unreadMessage: 1 },
    { username: 'Tim', timeStamp: '30 sec ago', unreadMessage: 2 },
    { username: 'James', timeStamp: '5 days ago', unreadMessage: 0 },
    { username: 'Jennie', timeStamp: '1 week ago', unreadMessage: 0 },
    { username: 'Patricia', timeStamp: '11/05/2024', unreadMessage: 0 },
  ];

  const chatDetail = {
    username: 'Sammie',
    messages: ['MovieIt invitation: Https://movieit.com/invitation/MV200135'],
  };

  return (
    <>
      <MessageList messageList={tempData} />
      <ChatRoom chatDetail={chatDetail} />
    </>
  );
};

export default MessagePage;
