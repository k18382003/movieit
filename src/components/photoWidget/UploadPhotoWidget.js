import { useEffect, useState } from 'react';
import PhotoDropZone from './PhotoDropZone';
import PhotoCropper from './PhotoCropper';
import React from 'react';
import Button from '../Button/Button';
import './UploadPhotoWidget.scss';
import axios from 'axios';
import close from '../../assets/icons/close.png';
const { REACT_APP_API_BASE_PATH } = process.env;

export default function UploadPhotoWidget({ closeUpload, setPhoto, userId }) {
  const [file, setFile] = useState([]);
  const [cropper, setCropper] = useState();
  const token = localStorage.getItem('JWTtoken');

  const onCropper = async () => {
    if (cropper) {
      try {
        const file = await cropper.getCroppedCanvas().toDataURL();
        const response = await axios.post(
          `${REACT_APP_API_BASE_PATH}/profile/uploadPhoto/${userId}`,
          {
            image: file,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPhoto(response.data);
        alert('Image uploaded!');
        closeUpload(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Clean up the data in the memory
  useEffect(() => {
    return () => {
      file.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [file]);

  return (
    <section className="uploadphoto-container">
      <div className="uploadphoto-container__close">
        <img
          src={close}
          alt="Close upload"
          className="uploadphoto-container__close-image"
          onClick={() => closeUpload(false)}
        />
      </div>
      <div className="uploadphoto-container__drop-zone">
        <h1>Step 1 - Upload Photo</h1>
        <PhotoDropZone setFile={setFile} />
      </div>
      <div className="uploadphoto-container__resize-zone">
        <h1>Step 2 - Resize Photo</h1>
        {file && file.length > 0 && (
          <PhotoCropper setCroper={setCropper} FileUrl={file[0].preview} />
        )}
      </div>
      <div className="uploadphoto-container__preview">
        <h1>Step 3 - Preview & Upload</h1>
        {cropper && (
          <>
            <div
              className="image-preview"
              style={{
                width: '100%',
                height: 200,
                overflow: 'hidden',
                marginBottom: '2px',
              }}
            ></div>
            <div className="uploadphoto-container__buttons">
              <Button
                onClick={onCropper}
                buttonText={'Upload'}
                UniqueStyleClass={'uploadphoto-container__upload-button'}
              />
              <Button
                onClick={() => {
                  setFile([]);
                  setCropper(undefined);
                }}
                buttonText={'Cancel'}
                UniqueStyleClass={'uploadphoto-container__cancel-button'}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
