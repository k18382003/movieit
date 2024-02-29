import { Link } from 'react-router-dom';
import upload from '../../../assets/icons/upload.png';
import './ProfilePhotoUpload.scss';

const ProfilePhotoUpload = ({ openUploadForm, photo, uniqueStyle }) => {
  return (
    <section className="profile-photo-upload">
      <img
        className={`profile-photo-upload__image ${uniqueStyle}`}
        src={photo || upload}
        onClick={() => openUploadForm(true)}
      />
    </section>
  );
};

export default ProfilePhotoUpload;
