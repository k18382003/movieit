import './InvitationItem.scss';
import avatar from '../../../assets/images/Default-Avatar.png';
import Button from '../../Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvitationItem = ({
  invitation,
  currentUser,
  token,
  invitationList,
  setInvitationList,
  closeInvitation,
}) => {
  const { REACT_APP_API_BASE_PATH } = process.env;
  const navigate = useNavigate();

  const calTimeLpase = (sendTime) => {
    let now = Date.now();
    let gap = Math.floor((now - sendTime) / 1000);
    if (gap >= 86400) {
      return Math.floor(gap / 86400) + ' days ago';
    } else if (gap >= 3600) {
      return Math.floor(gap / 3600) + ' hours ago';
    } else if (gap >= 60) {
      return Math.floor(gap / 60) + ' mins ago';
    }
    return gap + ' secs ago';
  };

  const UpdateMsgAction = async () => {
    try {
      await axios.patch(
        `${REACT_APP_API_BASE_PATH}/invitation/action/${currentUser.userId}`,
        {
          sender: invitation.sender,
          event_id: invitation.event_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvitationList(invitationList.filter((i) => i.need_action));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = () => {
    UpdateMsgAction();
    closeInvitation();
    navigate(`/events/${invitation.event_id}`);
  };

  const handleDenied = () => {
    UpdateMsgAction();
  };

  return (
    <div className="invitation-item">
      <img
        className="invitation-item__image"
        src={invitation.photo_url || avatar}
      />
      <div className="invitation-item__info-container">
        <p className="invitation-item__name-time">
          <span className="invitation-item__name">
            {invitation.displayname}
          </span>
          <span className="invitation-item__time">
            {calTimeLpase(invitation.send_time)}
          </span>
        </p>
        <div className="invitation-item__button-group">
          <Button
            buttonText={'DETAIL'}
            UniqueStyleClass={
              'invitation-item__button invitation-item__button--detail'
            }
            onClick={() => handleDetail()}
          />
          <Button
            buttonText={'DENIED'}
            UniqueStyleClass={
              'invitation-item__button invitation-item__button--denied'
            }
            onClick={() => handleDenied()}
          />
        </div>
      </div>
    </div>
  );
};

export default InvitationItem;
