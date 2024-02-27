import './InvitationItem.scss';
import avatar from '../../../assets/images/avatar.png';
import Button from '../../Button/Button';

const InvitationItem = ({ message }) => {
  return (
    <div className="invitation-item">
      <img className="invitation-item__image" src={avatar} />
      <div className="invitation-item__info-container">
        <p className="invitation-item__name-time">
          <span className="invitation-item__name">{message.username}</span>
          <span className="invitation-item__time">{message.timeStamp}</span>
        </p>
        <div className="invitation-item__button-group">
          <Button
            buttonText={'DETAIL'}
            UniqueStyleClass={
              'invitation-item__button invitation-item__button--detail'
            }
          />
          <Button
            buttonText={'DENIED'}
            UniqueStyleClass={'invitation-item__button invitation-item__button--denied'}
          />
        </div>
      </div>
    </div>
  );
};

export default InvitationItem;
