import InvitationItem from './InvitationItem';
import './InvitationList.scss';

const InvitationList = () => {
  const messageList = [
    { username: 'Sammie', timeStamp: '5 sec ago', unreadMessage: 1 },
    { username: 'Tim', timeStamp: '30 sec ago', unreadMessage: 2 },
    { username: 'James', timeStamp: '5 days ago', unreadMessage: 0 },
    { username: 'Jennie', timeStamp: '1 week ago', unreadMessage: 0 },
    { username: 'Patricia', timeStamp: '11/05/2024', unreadMessage: 0 },
  ];

  return (
    <section className="invitation-list">
      <h1 className="invitation-list__title">Invitation</h1>
      {messageList.map((message, index) => {
        return <InvitationItem key={index} message={message} />;
      })}
    </section>
  );
};

export default InvitationList;
