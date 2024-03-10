import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadPhotoWidget.scss';

export default function PhotoDropZone({ setFile }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles) {
        setFile(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={isDragActive ? 'dzStyle dzActive' : 'dzStyle'}
    >
      <input {...getInputProps()} />
      <h1>Drop image here</h1>
    </div>
  );
}
