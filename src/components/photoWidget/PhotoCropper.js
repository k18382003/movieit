import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import React from 'react';

export default function PhotoCropper({ setCroper, FileUrl }) {
  return (
    <Cropper
      src={FileUrl}
      style={{ height: 200, width: '100%' }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview={'.image-preview'}
      viewMode={1}
      autoCropArea={1}
      background={false}
      guides={false}
      onInitialized={(cropper) => setCroper(cropper)}
    />
  );
}
