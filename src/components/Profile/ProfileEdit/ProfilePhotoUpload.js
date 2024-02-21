import { Link } from 'react-router-dom';
import upload from '../../../assets/icons/upload.png';
import './ProfilePhotoUpload.scss';

const ProfilePhotoUpload = () => {
  const openUploadForm = () => {
    console.log('Open the form');
  };

  return (
    <section className="profile-photo-upload">
      <div className="profile-photo-upload__container">
        <img
          className="profile-photo-upload__image"
          src={upload}
          onClick={() => openUploadForm()}
        />
      </div>
    </section>
  );
};

export default ProfilePhotoUpload;
