import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function PhotoDropZone({ setFile }) {
  const dzStyle = {
    border: '2px dashed #eeee',
    boderColor: '#eeee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center',
    height: '20rem',
  };

  const dzActive = {
    borderColor: 'green',
  };

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
      console.log(acceptedFiles);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyle, ...dzActive } : dzStyle}
    >
      <input {...getInputProps()} />
      <h1>Drop image here</h1>
    </div>
  );
}
