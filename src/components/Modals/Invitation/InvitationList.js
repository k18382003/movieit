import InvitationItem from './InvitationItem';
import './InvitationList.scss';
import close from '../../../assets/icons/close.png';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { refreshTokenContext } from '../../Security/RefreshTokenProvider';

const InvitationList = ({ closeInvitation }) => {
  const [invitationList, setInvitationList] = useState();
  const { REACT_APP_API_BASE_PATH } = process.env;
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  const { token } = useContext(refreshTokenContext);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/account/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, [token]);

  useEffect(() => {
    const fetchInvitationList = async () => {
      const response = await axios.get(
        `${REACT_APP_API_BASE_PATH}/invitation/${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvitationList(response.data);
    };
    fetchInvitationList();
  }, [currentUser]);

  return (
    <section className="invitation-list">
      <div className="invitation-list__close">
        <img
          src={close}
          alt="Close Invitation"
          onClick={() => closeInvitation(false)}
        />
      </div>
      <h1 className="invitation-list__title">Invitation</h1>
      {invitationList &&
        currentUser &&
        invitationList.map((invitation, index) => {
          return (
            <InvitationItem
              key={index}
              invitationList={invitationList}
              setInvitationList={setInvitationList}
              invitation={invitation}
              currentUser={currentUser}
              token={token}
              closeInvitation={closeInvitation}
            />
          );
        })}
    </section>
  );
};

export default InvitationList;
